import { UI_LABELS } from "@/consts/ui";

export function getPostPageClientScript(postSlug: string) {
  return `
    (() => {
      const postSlug = ${JSON.stringify(postSlug)};
      const buttons = document.querySelectorAll("[data-copy-url]");
      const publishedAt = document.querySelector("[data-published-at]");
      const relatedPostCards = [...document.querySelectorAll("[data-related-post]")];
      const sessionStorageKey = postSlug ? "view-counted:" + postSlug : "";

      const formatPublishedAt = () => {
        if (!(publishedAt instanceof HTMLTimeElement)) return;

        const value = publishedAt.getAttribute("data-published-at");
        if (!value) return;

        const date = new Date(value);
        if (Number.isNaN(date.valueOf())) return;

        publishedAt.textContent = new Intl.DateTimeFormat("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(date);
      };

      const getSessionValue = (key) => {
        try {
          return window.sessionStorage.getItem(key);
        } catch {
          return null;
        }
      };

      const setSessionValue = (key, value) => {
        try {
          window.sessionStorage.setItem(key, value);
        } catch {}
      };

      const hasRecordedViewInSession = () =>
        Boolean(sessionStorageKey) && getSessionValue(sessionStorageKey) === "1";

      const markViewRecordedInSession = () => {
        if (sessionStorageKey) {
          setSessionValue(sessionStorageKey, "1");
        }
      };

      const hasViewedSlugInSession = (slug) =>
        Boolean(slug) && getSessionValue("view-counted:" + slug) === "1";

      const pickRelatedCards = (items) => {
        const lowViewFirst = [...items]
          .sort((left, right) =>
            right.sharedTagCount - left.sharedTagCount ||
            left.viewCount - right.viewCount
          )
          .slice(0, 2);
        const picked = new Set(lowViewFirst.map((item) => item.slug));
        const highViewLast = items
          .filter((item) => !picked.has(item.slug))
          .sort((left, right) =>
            right.sharedTagCount - left.sharedTagCount ||
            right.viewCount - left.viewCount
          )
          .slice(0, 1);
        const ordered = [...lowViewFirst, ...highViewLast];
        const orderedSlugs = new Set(ordered.map((item) => item.slug));
        return [...ordered, ...items.filter((item) => !orderedSlugs.has(item.slug))];
      };

      const orderRelatedPosts = () => {
        if (relatedPostCards.length === 0) return;

        const cards = relatedPostCards.map((card) => ({
          element: card,
          slug: card.getAttribute("data-related-post-slug") || "",
          sharedTagCount: Number(card.getAttribute("data-related-shared-tag-count") || "0"),
          viewCount: Number(card.getAttribute("data-related-view-count") || "0"),
        }));

        const unseen = cards.filter((card) => !hasViewedSlugInSession(card.slug));
        const seen = cards.filter((card) => hasViewedSlugInSession(card.slug));
        const finalCards = pickRelatedCards([...unseen, ...seen]).slice(0, 3);
        const finalSlugs = new Set(finalCards.map((card) => card.slug));
        const container = relatedPostCards[0]?.parentElement;
        if (!container) return;

        for (const card of cards) {
          const isSeen = hasViewedSlugInSession(card.slug);
          const seenBadge = card.element.querySelector("[data-related-seen-badge]");

          card.element.classList.toggle("hidden", !finalSlugs.has(card.slug));
          card.element.classList.toggle("opacity-55", isSeen);

          if (seenBadge) {
            seenBadge.classList.toggle("hidden", !isSeen);
          }
        }

        for (const card of finalCards) {
          container.appendChild(card.element);
        }
      };

      const resetTextAfterDelay = (element, text) => {
        window.setTimeout(() => {
          element.textContent = text;
        }, 1800);
      };

      const handleCopySuccess = ({ kind, inlineStatus, inlineDefault, label, defaultLabel, successLabel }) => {
        if (kind === "inline" && inlineStatus) {
          inlineStatus.textContent = successLabel;
          resetTextAfterDelay(inlineStatus, inlineDefault);
          return;
        }

        if (label) {
          label.textContent = successLabel;
          resetTextAfterDelay(label, defaultLabel);
        }
      };

      const handleCopyFailure = ({ kind, inlineStatus, inlineDefault, label, defaultLabel }) => {
        if (kind === "inline" && inlineStatus) {
          inlineStatus.textContent = ${JSON.stringify(UI_LABELS.copyFailure)};
          resetTextAfterDelay(inlineStatus, inlineDefault);
          return;
        }

        if (label) {
          label.textContent = ${JSON.stringify(UI_LABELS.copyFailure)};
          resetTextAfterDelay(label, defaultLabel);
        }
      };

      const bindCopyButtons = () => {
        for (const button of buttons) {
          button.addEventListener("click", async () => {
            const url = button.getAttribute("data-copy-url");
            const kind = button.getAttribute("data-copy-kind");
            const label = button.querySelector("[data-copy-label]");
            const inlineStatus = button.parentElement?.querySelector("[data-copy-inline-status]");
            const inlineDefault =
              inlineStatus?.getAttribute("data-copy-inline-default") ||
              ${JSON.stringify(UI_LABELS.copyHint)};
            const defaultLabel =
              button.getAttribute("data-copy-label-default") ||
              ${JSON.stringify(UI_LABELS.copyLabel)};
            const successLabel =
              button.getAttribute("data-copy-label-success") ||
              ${JSON.stringify(UI_LABELS.copySuccess)};

            if (!url) return;

            try {
              await navigator.clipboard.writeText(url);
              handleCopySuccess({
                kind,
                inlineStatus,
                inlineDefault,
                label,
                defaultLabel,
                successLabel,
              });
            } catch {
              handleCopyFailure({
                kind,
                inlineStatus,
                inlineDefault,
                label,
                defaultLabel,
              });
            }
          });
        }
      };

      const updateViewCount = async () => {
        if (!postSlug || hasRecordedViewInSession()) return;

        try {
          const response = await fetch("/api/views", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ slug: postSlug }),
            credentials: "same-origin",
          });

          if (!response.ok) return;

          await response.json();
          markViewRecordedInSession();
        } catch {}
      };

      formatPublishedAt();
      orderRelatedPosts();
      bindCopyButtons();
      updateViewCount();
    })();
  `;
}
