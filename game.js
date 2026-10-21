"use strict";

const detail = { game: null, catalog: [], media: [], current: 0, screenshot: 0, loading: false };
const motionReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
const statusLabels = { released: "출시", "coming-soon": "출시 예정", "in-development": "개발 중" };

async function loadDetail() {
  if (detail.loading) return;
  detail.loading = true;
  $("#game-content").setAttribute("aria-busy", "true");
  try {
    const id = new URLSearchParams(location.search).get("id");
    if (!id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
      renderError("게임을 선택해 주세요.", "게임 목록에서 원하는 게임을 선택하면 자세한 소개를 볼 수 있습니다.");
      return;
    }
    const manifest = await getJSON("content/games.json");
    if (!Array.isArray(manifest.games)) throw new Error("Invalid game manifest.");
    const results = await Promise.allSettled(manifest.games.map(async file => validateGame(await getJSON(file))));
    detail.catalog = results.filter(result => result.status === "fulfilled").map(result => result.value).filter(isGameVisible);
    detail.game = detail.catalog.find(game => game.id === id);
    if (!detail.game) {
      const failed = results.some(result => result.status === "rejected");
      renderError(failed ? "게임 정보를 불러오지 못했습니다." : "게임을 찾을 수 없습니다.", failed ? "잠시 후 다시 시도해 주세요." : "주소가 변경되었거나 아직 공개되지 않은 게임입니다.", failed);
      return;
    }
    const game = detail.game;
    detail.media = [
      ...(game.videos || []).filter(video => youtubeVideoID(video.url)).map(video => ({ ...video, type: "video", id: youtubeVideoID(video.url), title: video.title || "게임 트레일러" })),
      ...screenshots(game).map((shot, index) => ({ ...shot, type: "image", shotIndex: index }))
    ];
    detail.current = 0;
    document.title = `${game.title} — NAHON Studio`;
    $('meta[name="description"]').content = game.description;
    $('meta[property="og:title"]').content = document.title;
    $('meta[property="og:description"]').content = game.description;
    renderDetail();
  } catch (error) {
    console.error(error);
    renderError("게임 정보를 불러오지 못했습니다.", "잠시 후 다시 시도하거나 게임 목록으로 돌아가 주세요.", true);
  } finally {
    detail.loading = false;
    $("#game-content").setAttribute("aria-busy", "false");
  }
}

function renderError(title, message, retry = false) {
  document.title = "게임 안내 — NAHON Studio";
  $("#game-content").innerHTML = `<div class="wrap detail-error" role="alert"><div class="eyebrow">NAHON STUDIO</div><h1>${escapeHTML(title)}</h1><p>${escapeHTML(message)}</p><a class="hero-link" href="./index.html#games">게임 목록으로 <span aria-hidden="true">↗</span></a>${retry ? ' <button class="hero-link" id="detail-retry" type="button">다시 불러오기 ↻</button>' : ""}</div>`;
}

function renderAgeRating(game) {
  if (!game.ageRating) return "";
  const classification = game.ageRating;
  const rating = KR_AGE_RATINGS[classification.rating];
  const rows = [
    ["적용 지역", "대한민국"],
    ["분류 방식", classification.method === "self" ? "자체등급분류" : "등급분류기관 심의"],
    ...(classification.authority ? [["분류 기관·사업자", classification.authority]] : []),
    ...(classification.classificationNumber ? [["등급분류번호", classification.classificationNumber]] : []),
    ...(classification.classifiedAt ? [["등급분류일", classification.classifiedAt]] : []),
    ...(classification.contentDescriptors !== undefined ? [["내용정보", classification.contentDescriptors.length ? classification.contentDescriptors.join(" · ") : "해당 없음"]] : [])
  ];
  return `<section class="game-rating" aria-labelledby="age-rating-title">
    <h2 id="age-rating-title">등급분류 정보</h2>
    <div class="rating-summary">${ageRatingImage(game)}<div><strong>${rating.label}</strong><p>${rating.description}</p></div></div>
    <table class="rating-table"><caption class="sr-only">${escapeHTML(game.title)} 등급분류 세부 정보</caption><tbody>${rows.map(([label, value]) => `<tr><th scope="row">${label}</th><td>${escapeHTML(value)}</td></tr>`).join("")}</tbody></table>
  </section>`;
}

function renderDetail() {
  const game = detail.game;
  const tags = game.tags?.length ? game.tags : game.genre.split("·").map(tag => tag.trim()).filter(Boolean);
  const facts = [
    ["출시", game.releaseDate || statusLabels[game.status]],
    ["개발", game.developer || "NAHON Studio"],
    ["장르", game.genre],
    ...(game.players ? [["플레이", game.players]] : []),
    ...(game.languages?.length ? [["지원 언어", game.languages.join(" · ")]] : [])
  ];
  const videos = detail.media.filter(item => item.type === "video");
  const related = detail.catalog.filter(item => item.id !== game.id).slice(0, 2);
  $("#game-content").innerHTML = `
    <div class="wrap">
      <nav class="breadcrumbs" aria-label="현재 위치"><a href="./index.html">NAHON Studio</a><span aria-hidden="true">/</span><a href="./index.html#games">Games</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHTML(game.title)}</span></nav>
      <div class="detail-heading"><div><div class="eyebrow"><span class="orange-dot"></span> A NEW WORLD TO DISCOVER</div><h1>${escapeHTML(game.title)}</h1></div>${game.demo ? '<span class="sample-label">예시 프로젝트 · CONCEPT PREVIEW</span>' : `<span class="sample-label">${statusLabels[game.status]}</span>`}</div>
      <div class="product-layout">
        <section class="media-browser" aria-label="${escapeHTML(game.title)} 영상과 스크린샷">
          <div id="media-stage" class="media-stage"></div>
          <div class="media-toolbar"><p id="media-caption" class="media-caption" role="status" aria-live="polite"></p><div class="media-controls"><button id="media-prev" class="round-button" type="button" aria-label="이전 미디어">←</button><span id="media-count"></span><button id="media-next" class="round-button" type="button" aria-label="다음 미디어">→</button></div></div>
          <div class="media-thumbnails" id="media-thumbnails" role="group" aria-label="영상과 스크린샷 선택">
            ${detail.media.map((item, index) => `<button class="media-thumbnail" type="button" data-media="${index}" aria-pressed="false" aria-controls="media-stage" aria-label="${item.type === "video" ? `영상: ${escapeHTML(item.title)}` : `스크린샷 ${item.shotIndex + 1}: ${escapeHTML(item.alt)}`}"><img src="${escapeHTML(localURL(item.type === "video" ? item.poster || game.banner : item.src))}" alt="" loading="lazy">${item.type === "video" ? '<span class="thumbnail-play" aria-hidden="true">▶</span><span class="thumbnail-mark">TRAILER</span>' : `<span class="thumbnail-mark">${pad(item.shotIndex + 1)}</span>`}</button>`).join("")}
          </div>
          <a id="youtube-link" class="youtube-link" target="_blank" rel="noopener noreferrer" hidden>YouTube에서 직접 보기 ↗</a>
          <p class="media-help">${videos.length ? "영상이 재생되지 않으면 YouTube에서 직접 볼 수 있습니다." : "트레일러는 준비 중입니다."} 이미지를 누르면 크게 볼 수 있습니다.</p>
        </section>
        <aside class="product-summary" aria-label="게임 정보와 플랫폼">
          <img class="summary-cover" src="${escapeHTML(localURL(game.cover || game.banner))}" alt="${escapeHTML(game.bannerAlt)}">
          <p class="summary-tagline">${escapeHTML(game.tagline)}</p><p class="summary-description">${escapeHTML(game.description)}</p>
          <dl class="game-facts">${facts.map(([label, value]) => `<dt>${label}</dt><dd>${escapeHTML(value)}</dd>`).join("")}</dl>
          <div class="detail-tags" aria-label="게임 태그">${tags.map(tag => `<span class="detail-tag">${escapeHTML(tag)}</span>`).join("")}</div>
          ${renderAgeRating(game)}
          <div class="product-stores"><h2>플레이할 플랫폼을 선택하세요</h2><div class="detail-store-list">${game.platforms.map(renderStore).join("")}</div></div>
          ${game.demo ? '<p class="detail-demo-note">이 페이지의 게임과 이미지는 소개 페이지 구성을 보여주는 예시입니다. 실제 출시 게임 정보가 아닙니다.</p>' : ""}
        </aside>
      </div>
      <div class="detail-bottom">
        <section class="about-game" aria-labelledby="about-title"><h2 id="about-title">이 게임에 대하여 <span>ABOUT THIS GAME</span></h2>${(game.about?.length ? game.about : [game.description]).map(paragraph => `<p>${escapeHTML(paragraph)}</p>`).join("")}${game.features?.length ? `<h3>이런 경험을 만나보세요</h3><ul class="feature-list">${game.features.map(feature => `<li>${escapeHTML(feature)}</li>`).join("")}</ul>` : ""}</section>
        <aside class="detail-more" aria-labelledby="more-title"><h2 id="more-title">NAHON의 또 다른 세계</h2>${related.map(item => `<a class="related-game" href="${escapeHTML(gameURL(item.id))}"><img src="${escapeHTML(localURL(item.cover || item.banner))}" alt="" loading="lazy"><span><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(item.genre)}</small></span></a>`).join("")}<a class="detail-all-games" href="./index.html#games">모든 게임 둘러보기 <span aria-hidden="true">↗</span></a></aside>
      </div>
    </div>`;
  selectMedia(0, false);
  attachSwipe($("#media-stage"), move => selectMedia(detail.current + move));
}

function selectMedia(index, revealThumbnail = true) {
  if (!detail.media.length) return;
  detail.current = (index + detail.media.length) % detail.media.length;
  const item = detail.media[detail.current];
  // Replacing the stage also removes the old iframe and stops its audio.
  $("#media-stage").innerHTML = item.type === "video"
    ? `<button type="button" class="video-poster" data-play-video aria-label="${escapeHTML(item.title)} 재생"><img src="${escapeHTML(localURL(item.poster || detail.game.banner))}" alt=""><span class="video-play"><span class="video-play-symbol" aria-hidden="true">▶</span><strong>${escapeHTML(item.title)}</strong><small>YouTube 트레일러 재생</small></span></button>`
    : `<button type="button" class="media-image-button" data-enlarge aria-label="스크린샷 ${item.shotIndex + 1} 확대 보기"><img src="${escapeHTML(localURL(item.src))}" alt="${escapeHTML(item.alt)}" decoding="async"><span class="media-enlarge" aria-hidden="true">⛶ 크게 보기</span></button>`;
  $("#media-caption").textContent = item.type === "video" ? item.title : item.caption || item.alt;
  $("#media-count").textContent = `${pad(detail.current + 1)} / ${pad(detail.media.length)}`;
  $("#media-prev").disabled = detail.media.length < 2;
  $("#media-next").disabled = detail.media.length < 2;
  $("#youtube-link").hidden = item.type !== "video";
  if (item.type === "video") $("#youtube-link").href = `https://www.youtube.com/watch?v=${item.id}`;
  $$(".media-thumbnail").forEach((button, i) => {
    const selected = i === detail.current;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
    if (selected && revealThumbnail) button.scrollIntoView({ behavior: motionReduced.matches ? "instant" : "smooth", block: "nearest", inline: "nearest" });
  });
}

function playVideo() {
  const item = detail.media[detail.current];
  if (item?.type !== "video") return;
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&rel=0&playsinline=1`;
  iframe.title = `${detail.game.title} — ${item.title}`;
  iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  $("#media-stage").replaceChildren(iframe);
  iframe.focus();
}

function openLightbox() {
  const item = detail.media[detail.current];
  if (item?.type !== "image") return;
  detail.screenshot = item.shotIndex;
  $("#lightbox-title").textContent = detail.game.title;
  renderLightbox();
  $("#lightbox").showModal();
  document.body.classList.add("body-dialog-open");
}

function renderLightbox() {
  const shots = screenshots(detail.game);
  const shot = shots[detail.screenshot];
  $("#lightbox-image").src = localURL(shot.src);
  $("#lightbox-image").alt = shot.alt;
  $("#lightbox-caption").textContent = shot.caption || shot.alt;
  $("#lightbox-count").textContent = `${pad(detail.screenshot + 1)} / ${pad(shots.length)}`;
  $("#lightbox-prev").disabled = shots.length < 2;
  $("#lightbox-next").disabled = shots.length < 2;
}

function moveLightbox(step) {
  if (!detail.game) return;
  const shots = screenshots(detail.game);
  detail.screenshot = (detail.screenshot + step + shots.length) % shots.length;
  renderLightbox();
}

function attachSwipe(element, onMove) {
  let start = null;
  element.addEventListener("touchstart", event => {
    start = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
  }, { passive: true });
  element.addEventListener("touchend", event => {
    if (!start) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      event.preventDefault();
      onMove(dx < 0 ? 1 : -1);
    }
    start = null;
  }, { passive: false });
  element.addEventListener("touchcancel", () => { start = null; });
}

$("#game-content").addEventListener("click", event => {
  const target = event.target.closest("button");
  if (!target) return;
  if (target.hasAttribute("data-media")) selectMedia(Number(target.dataset.media));
  else if (target.id === "media-prev") selectMedia(detail.current - 1);
  else if (target.id === "media-next") selectMedia(detail.current + 1);
  else if (target.hasAttribute("data-play-video")) playVideo();
  else if (target.hasAttribute("data-enlarge")) openLightbox();
  else if (target.id === "detail-retry") loadDetail();
});
$("#game-content").addEventListener("keydown", event => {
  if (!event.target.closest(".media-browser") || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const focused = event.target.closest("[data-media]");
  const from = focused ? Number(focused.dataset.media) : detail.current;
  const next = event.key === "Home" ? 0 : event.key === "End" ? detail.media.length - 1 : from + (event.key === "ArrowRight" ? 1 : -1);
  selectMedia(next);
  $$(".media-thumbnail")[detail.current].focus({ preventScroll: true });
});
$("#lightbox-close").addEventListener("click", () => $("#lightbox").close());
$("#lightbox-prev").addEventListener("click", () => moveLightbox(-1));
$("#lightbox-next").addEventListener("click", () => moveLightbox(1));
$("#lightbox").addEventListener("keydown", event => {
  if (["ArrowLeft", "ArrowRight"].includes(event.key)) { event.preventDefault(); moveLightbox(event.key === "ArrowRight" ? 1 : -1); }
});
$("#lightbox").addEventListener("close", () => {
  document.body.classList.remove("body-dialog-open");
  // Keep the main viewer on the image the visitor last viewed in the lightbox.
  const index = detail.media.findIndex(item => item.type === "image" && item.shotIndex === detail.screenshot);
  selectMedia(index, false);
  $("[data-enlarge]")?.focus({ preventScroll: true });
});
$("#lightbox").addEventListener("click", event => {
  if (event.target !== event.currentTarget) return;
  const rect = event.currentTarget.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.currentTarget.close();
});
attachSwipe($("#lightbox .gallery-image-wrap"), moveLightbox);
window.addEventListener("pagehide", () => { $("#media-stage iframe")?.remove(); });
window.addEventListener("pageshow", event => { if (event.persisted && detail.game) selectMedia(detail.current, false); });
loadDetail();
