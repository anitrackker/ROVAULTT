(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document?document.currentScript: void 0, 64886, e => {
  e.v( {
    active: "LegalDocument-module-scss-module__tqAv9q__active", backToTop: "LegalDocument-module-scss-module__tqAv9q__backToTop", container: "LegalDocument-module-scss-module__tqAv9q__container", content: "LegalDocument-module-scss-module__tqAv9q__content", contentWrapper: "LegalDocument-module-scss-module__tqAv9q__contentWrapper", header: "LegalDocument-module-scss-module__tqAv9q__header", lastUpdated: "LegalDocument-module-scss-module__tqAv9q__lastUpdated", searchBar: "LegalDocument-module-scss-module__tqAv9q__searchBar", searchInput: "LegalDocument-module-scss-module__tqAv9q__searchInput", sidebar: "LegalDocument-module-scss-module__tqAv9q__sidebar", title: "LegalDocument-module-scss-module__tqAv9q__title", toc: "LegalDocument-module-scss-module__tqAv9q__toc", tocHeader: "LegalDocument-module-scss-module__tqAv9q__tocHeader", tocToggle: "LegalDocument-module-scss-module__tqAv9q__tocToggle"
  })
}, 350652, e => {
  "use strict"; var t = e.i(478902), s = e.i(389959), l = e.i(896327), a = e.i(719745), c = e.i(64886); function n(e) {
    return e.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-")
  }
  function o(e) {
    return"string" == typeof e?e: Array.isArray(e)?e.map(o).join(""): e?.props?.children?o(e.props.children): ""
  }
  e.s(["LegalDocument", 0, ( {
    title: e, content: i, lastUpdated: r
  }) => {
    let[d, u] = (0, s.useState)(!1), [m, h] = (0, s.useState)(""), [_, f] = (0, s.useState)(""), [p, g] = (0, s.useState)(!0), v = (0, s.useMemo)(() => {
      let e, t = /^##\s+(.+)$/gm, s = []; for(; null !== (e = t.exec(i)); ) {
        let t = e[1].trim(); s.push( {
          id: n(t), text: t, level: 2
        })
      }
      return s
    }, [i]); (0, s.useEffect)(() => {
      let e = () => {
        u(window.scrollY>400); let e = document.querySelectorAll(".legal-heading"), t = ""; e.forEach(e => {
          e.getBoundingClientRect().top <= 100 && (t = e.id)
        }), h(t)
      }; return window.addEventListener("scroll", e), () => window.removeEventListener("scroll", e)
    }, []); let b = (0, s.useMemo)(() => {
      if(!_.trim())return i; let e = i.split("\n").filter(e => e.toLowerCase().includes(_.toLowerCase())); return e.length>0?e.join("\n"): i
    }, [i, _]); return(0, t.jsxs)("div", {
      className: c.default.container, children: [(0, t.jsx)("header", {
        className: c.default.header, children: (0, t.jsx)("h1", {
          className: c.default.title, children: e
        })
      }), (0, t.jsx)("div", {
        className: c.default.searchBar, children: (0, t.jsx)("input", {
          type: "search", placeholder: "Search document...", value: _, onChange: e => f(e.target.value), className: c.default.searchInput
        })
      }), (0, t.jsxs)("div", {
        className: c.default.contentWrapper, children: [v.length>0 && (0, t.jsxs)("aside", {
          className: `${c.default.sidebar} ${p?c.default.sidebarVisible:""}`, children: [(0, t.jsxs)("div", {
            className: c.default.tocHeader, children: [(0, t.jsx)("h2", {
              children: "Table of Contents"
            }), (0, t.jsx)("button", {
              onClick: () => g(!p), className: c.default.tocToggle, "aria-label": "Toggle table of contents", children: p?"−": "+"
            })]
          }), p && (0, t.jsx)("nav", {
            className: c.default.toc, children: (0, t.jsx)("ul", {
              children: v.map(e => (0, t.jsx)("li", {
                children: (0, t.jsx)("a", {
                  href: `#${e.id}`, onClick: t => {
                    t.preventDefault(); var s = e.id; let l = document.getElementById(s); if(l) {
                      let e = l.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo( {
                        top: e, behavior: "smooth"
                      })
                    }
                  }, className: m === e.id?c.default.active: "", children: e.text
                })
              }, e.id))
            })
          })]
        }), (0, t.jsx)("article", {
          className: c.default.content, children: (0, t.jsx)(l.default, {
            remarkPlugins: [a.default], components: {
              h2: ( {
                children: e, ...s
              }) => {
                let l = n(o(e)); return(0, t.jsx)("h2", {
                  id: l, className: "legal-heading", ...s, children: e
                })
              }, h3: ( {
                children: e, ...s
              }) => {
                let l = n(o(e)); return(0, t.jsx)("h3", {
                  id: l, className: "legal-heading", ...s, children: e
                })
              }, a: ( {
                ...e
              }) => (0, t.jsx)("a", {
                ...e, target: "_blank", rel: "noopener noreferrer"
              })
            }, children: b
          })
        })]
      }), d && (0, t.jsx)("button", {
        onClick: () => {
          window.scrollTo( {
            top: 0, behavior: "smooth"
          })
        }, className: c.default.backToTop, "aria-label": "Back to top", children: "↑"
      })]
    })
  }])
}, 368536, e => {
  "use strict"; var t = e.i(478902), s = e.i(350652), l = e.i(383312), a = e.i(578704); function c( {
    content: e, title: l, lastUpdated: c
  }) {
    return(0, t.jsxs)(t.Fragment, {
      children: [(0, t.jsx)(a.default, {
        title: "Terms of Service | Bloxflip", description: "Read the Bloxflip Terms of Service — rules, policies, and guidelines for using the #1 R$ social casino and arcade."
      }), (0, t.jsx)(s.LegalDocument, {
        title: l, content: e, lastUpdated: c
      })]
    })
  }
  c.getLayout = function(e) {
    return(0, t.jsx)(l.default, {
      children: e
    })
  }, e.s(["__N_SSG", () => !0, "default", () => c])
}, 520853, (e, t, s) => {
  let l = "/terms"; (window.__NEXT_P = window.__NEXT_P || []).push([l, () => e.r(368536)]), t.hot && t.hot.dispose(function() {
    window.__NEXT_P.push([l])
  })
}, 915468, e => {
  e.v(t => Promise.all(["static/chunks/2b31dd2fdb376617.js"].map(t => e.l(t))).then(() => t(900070)))
}, 382497, e => {
  e.v(t => Promise.all(["static/chunks/2576771ba550fccd.js"].map(t => e.l(t))).then(() => t(158629)))
}, 888039, e => {
  e.v(t => Promise.all(["static/chunks/ea56871bdfd31838.css", "static/chunks/d1929370c9df855b.js"].map(t => e.l(t))).then(() => t(256815)))
}, 109801, e => {
  e.v(t => Promise.all(["static/chunks/0db4b752b2726746.css", "static/chunks/f1a28ffa16668bdd.js"].map(t => e.l(t))).then(() => t(554052)))
}, 722267, e => {
  e.v(t => Promise.all(["static/chunks/673cf1291872382e.js"].map(t => e.l(t))).then(() => t(855713)))
}, 458105, e => {
  e.v(t => Promise.all(["static/chunks/fbe05d8a774541fc.js"].map(t => e.l(t))).then(() => t(747709)))
}, 803842, e => {
  e.v(t => Promise.all(["static/chunks/b1e0fb416bdd569a.css", "static/chunks/924f3ee9e84eaa34.js"].map(t => e.l(t))).then(() => t(787597)))
}, 647812, e => {
  e.v(t => Promise.all(["static/chunks/d78bc5b32b65f3c9.css", "static/chunks/df1b69ab7c1a9d57.js"].map(t => e.l(t))).then(() => t(170227)))
}, 196037, e => {
  e.v(t => Promise.all(["static/chunks/06e94455bd93a867.js"].map(t => e.l(t))).then(() => t(631250)))
}, 847965, e => {
  e.v(t => Promise.all(["static/chunks/79fa5c3e401edf2a.js"].map(t => e.l(t))).then(() => t(281102)))
}, 736131, e => {
  e.v(t => Promise.all(["static/chunks/e95ce2c16171a33b.js"].map(t => e.l(t))).then(() => t(374161)))
}, 156381, e => {
  e.v(t => Promise.all(["static/chunks/fee5c0daaf6bbb0d.js"].map(t => e.l(t))).then(() => t(975265)))
}, 715790, e => {
  e.v(t => Promise.all(["static/chunks/f78b786f0aa4b0eb.js"].map(t => e.l(t))).then(() => t(9785)))
}, 666631, e => {
  e.v(t => Promise.all(["static/chunks/5a231b4c32f64fe3.js"].map(t => e.l(t))).then(() => t(250748)))
}, 751241, e => {
  e.v(t => Promise.all(["static/chunks/7597357cbc5996ab.js"].map(t => e.l(t))).then(() => t(87589)))
}]);