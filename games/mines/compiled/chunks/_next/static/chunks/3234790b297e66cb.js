(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document?document.currentScript: void 0, 35269, e => {
  "use strict"; e.i(824626); var a = e.i(433886), t = e.i(166852), s = e.i(389959), r = e.i(197649), l = e.i(242973), i = e.i(26909), n = e.i(221283), o = e.i(632683), c = e.i(49507), d = e.i(915393), u = e.i(10950), h = e.i(794678); function m(e) {
    return(0, h.default)("MuiSkeleton", e)
  }
  (0, u.default)("MuiSkeleton", ["root", "text", "rectangular", "rounded", "circular", "pulse", "wave", "withChildren", "fitContent", "heightAuto"]); var k = e.i(478902); let b = ["animation", "className", "component", "height", "style", "variant", "width"], f = e => e, p, w, y, _, v = (0, l.keyframes)(p || (p = f`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)), g = (0, l.keyframes)(w || (w = f`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)), x = (0, c.default)("span", {
    name: "MuiSkeleton", slot: "Root", overridesResolver: (e, a) => {
      let {
        ownerState: t
      }
      = e; return[a.root, a[t.variant], !1 !== t.animation && a[t.animation], t.hasChildren && a.withChildren, t.hasChildren && !t.width && a.fitContent, t.hasChildren && !t.height && a.heightAuto]
    }
  })(( {
    theme: e, ownerState: a
  }) => {
    var s, r; let l = String(e.shape.borderRadius).match(/[\d.\-+]*\s*(.*)/)[1] || "px", i = parseFloat(e.shape.borderRadius); return(0, t.default)( {
      display: "block", backgroundColor: e.vars?e.vars.palette.Skeleton.bg: (s = e.palette.text.primary, r = "light" === e.palette.mode?.11: .13, s = function e(a) {
        let t; if(a.type)return a; if("#" === a.charAt(0)) {
          var s; let t, r; return e((s = (s = a).slice(1), t = RegExp(`.{1,${s.length>=6?2:1}}`, "g"), (r = s.match(t)) && 1 === r[0].length && (r = r.map(e => e + e)), r?`rgb${4===r.length?"a":""}(${r.map((e,a)=>a<3?parseInt(e,16):Math.round(parseInt(e,16)/255*1e3)/1e3).join(", ")})`: ""))
        }
        let r = a.indexOf("("), l = a.substring(0, r); if(-1 === ["rgb", "rgba", "hsl", "hsla", "color"].indexOf(l))throw Error((0, n.default)(9, a)); let i = a.substring(r + 1, a.length - 1); if("color" === l) {
          if(t = (i = i.split(" ")).shift(), 4 === i.length && "/" === i[3].charAt(0) && (i[3] = i[3].slice(1)), -1 === ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(t))throw Error((0, n.default)(10, t))
        }else i = i.split(","); return {
          type: l, values: i = i.map(e => parseFloat(e)), colorSpace: t
        }
      }
      (s), r = function(e, a = 0, t = 1) {
        return(0, o.default)(e, a, t)
      }
      (r), ("rgb" === s.type || "hsl" === s.type) && (s.type += "a"), "color" === s.type?s.values[3] = `/${r}`: s.values[3] = r, function(e) {
        let {
          type: a, colorSpace: t
        }
        = e, {
          values: s
        }
        = e; return - 1 !== a.indexOf("rgb")?s = s.map((e, a) => a<3?parseInt(e, 10): e): -1 !== a.indexOf("hsl") && (s[1] = `${s[1]}%`, s[2] = `${s[2]}%`), s = -1 !== a.indexOf("color")?`${t} ${s.join(" ")}`: `${s.join(", ")}`, `${a}(${s})`
      }
      (s)), height: "1.2em"
    }, "text" === a.variant && {
      marginTop: 0, marginBottom: 0, height: "auto", transformOrigin: "0 55%", transform: "scale(1, 0.60)", borderRadius: `${i}${l}/${Math.round(i/.6*10)/10}${l}`, "&:empty:before": {
        content: '"\\00a0"'
      }
    }, "circular" === a.variant && {
      borderRadius: "50%"
    }, "rounded" === a.variant && {
      borderRadius: (e.vars || e).shape.borderRadius
    }, a.hasChildren && {
      "& > *": {
        visibility: "hidden"
      }
    }, a.hasChildren && !a.width && {
      maxWidth: "fit-content"
    }, a.hasChildren && !a.height && {
      height: "auto"
    })
  }, ( {
    ownerState: e
  }) => "pulse" === e.animation && (0, l.css)(y || (y = f`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `), v), ( {
    ownerState: e, theme: a
  }) => "wave" === e.animation && (0, l.css)(_ || (_ = f`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `), g, (a.vars || a).palette.action.hover)), R = s.forwardRef(function(e, s) {
    let l = (0, d.useDefaultProps)( {
      props: e, name: "MuiSkeleton"
    }), {
      animation: n = "pulse", className: o, component: c = "span", height: u, style: h, variant: f = "text", width: p
    }
    = l, w = (0, a.default)(l, b), y = (0, t.default)( {

    }, l, {
      animation: n, component: c, variant: f, hasChildren: !!w.children
    }), _ = (e => {
      let {
        classes: a, variant: t, animation: s, hasChildren: r, width: l, height: n
      }
      = e; return(0, i.default)( {
        root: ["root", t, s, r && "withChildren", r && !l && "fitContent", r && !n && "heightAuto"]
      }, m, a)
    })(y); return(0, k.jsx)(x, (0, t.default)( {
      as: c, ref: s, className: (0, r.default)(_.root, o), ownerState: y
    }, w, {
      style: (0, t.default)( {
        width: p, height: u
      }, h)
    }))
  }); e.s(["Skeleton", 0, R], 35269)
}, 887079, e => {
  e.v( {
    levelHero: "Rewards-module-scss-module__Qn2yBa__levelHero", levelHeroCircle: "Rewards-module-scss-module__Qn2yBa__levelHeroCircle", levelHeroContent: "Rewards-module-scss-module__Qn2yBa__levelHeroContent", rakebackTile: "Rewards-module-scss-module__Qn2yBa__rakebackTile", rakebackTileAmount: "Rewards-module-scss-module__Qn2yBa__rakebackTileAmount", rakebackTileButton: "Rewards-module-scss-module__Qn2yBa__rakebackTileButton", rakebackTileCurrency: "Rewards-module-scss-module__Qn2yBa__rakebackTileCurrency", rakebackTileDisabled: "Rewards-module-scss-module__Qn2yBa__rakebackTileDisabled", rakebackTileLabel: "Rewards-module-scss-module__Qn2yBa__rakebackTileLabel", rakebackTiles: "Rewards-module-scss-module__Qn2yBa__rakebackTiles", rewards: "Rewards-module-scss-module__Qn2yBa__rewards", rewardsBanner: "Rewards-module-scss-module__Qn2yBa__rewardsBanner", rewardsBannerTitle: "Rewards-module-scss-module__Qn2yBa__rewardsBannerTitle", rewardsCaution: "Rewards-module-scss-module__Qn2yBa__rewardsCaution", rewardsCautionText: "Rewards-module-scss-module__Qn2yBa__rewardsCautionText", rewardsNav: "Rewards-module-scss-module__Qn2yBa__rewardsNav", robuxCurrency: "Rewards-module-scss-module__Qn2yBa__robuxCurrency"
  })
}, 273798, e => {
  e.v( {
    rewardsNav: "rewardsNav-module-scss-module__i0zZiG__rewardsNav"
  })
}, 333405, e => {
  "use strict"; var a = e.i(478902), t = e.i(329379), s = e.i(177044), r = e.i(907153), l = e.i(273798); function i() {
    let e = (0, s.useRouter)().pathname; return(0, a.jsx)("nav", {
      className: l.default.rewardsNav, children: [ {
        href: "/rewards/rakeback", label: "Rakeback", match: "/rewards/rakeback"
      }, {
        href: "/rewards/keys", label: "Key Cases", match: "/rewards/keys"
      }, {
        href: "/rewards/levels", label: "Level Rewards", match: "/rewards/levels"
      }].map(s => (0, a.jsx)(t.default, {
        href: s.href, passHref: !0, legacyBehavior: !0, children: (0, a.jsx)(r.default, {
          as: "a", title: s.label, variant: "tab", isActive: e.startsWith(s.match), children: s.label
        })
      }, s.href))
    })
  }
  e.s(["default", () => i])
}, 863212, e => {
  "use strict"; var a = e.i(478902), t = e.i(389959), s = e.i(944967), r = e.i(383312), l = e.i(578704), i = e.i(907153), n = e.i(887079); e.i(802398); var o = e.i(565252), c = e.i(333405), d = e.i(56040), u = e.i(692742), h = e.i(35269), m = e.i(263203), k = e.i(455675); let b = ( {
    days: e, hours: a, minutes: t, seconds: s
  }) => `${e>0?`$ {
    e
  }
  d`:""}${String(a).padStart(2,"0")}:${String(t).padStart(2,"0")}:${String(s).padStart(2,"0")}`, f = [ {
    key: "instant", label: "Instant Rakeback"
  }, {
    key: "daily", label: "Daily Rakeback"
  }, {
    key: "weekly", label: "Weekly Rakeback"
  }, {
    key: "monthly", label: "Monthly Rakeback"
  }], p = ( {
    user: e, isAuthenticated: r, ...o
  }) => {
    let[p, w] = (0, t.useState)(null), [y, _] = (0, t.useState)(!1), [v, g] = (0, t.useState)(null), x = p?.rakeback; (0, t.useEffect)(() => {
      let e = setTimeout(() => {
        _(!0)
      }, 1e3); return() => clearTimeout(e)
    }, []), (0, t.useEffect)(() => {
      r && (async() => {
        try {
          let e = await (0, d.getUserVipData)(); w(e.wallet || e)
        }catch(e) {
          u.toast.error("There was an error while loading your rakeback information, please try again!")
        }
      })()
    }, [r]); let R = async e => {
      try {
        g(e), _(!1), (0, d.changeSourceHeader)(void 0, "rakeback"); let a = await (0, d.claimRakebackBalance)(e); if(a.success) {
          a.coins?u.toast.success(`Successfully claimed ${a.coins.toLocaleString()} coins!`): a.claimed?u.toast.success(`Successfully claimed ${a.claimed} rakeback!`): u.toast.success("Successfully claimed!"); let e = await (0, d.getUserVipData)(); w(e.wallet || e), _(!0)
        }else u.toast.error(a.message || "Failed to claim reward"), _(!0)
      }catch(e) {
        e.response?.data?.msg?u.toast.error(e.response.data.msg): e.response?.data?.message?u.toast.error(e.response.data.message): u.toast.error("There was an error while claiming your reward, please try again!"), _(!0)
      }finally {
        g(null)
      }
    }; return(0, a.jsxs)(a.Fragment, {
      children: [(0, a.jsx)(l.default, {
        title: "Rakeback | Bloxflip - Earn Back on Every Wager", description: "Earn rakeback on every wager on Bloxflip — instant, daily, weekly, and monthly rakeback tiers. The more you play, the more you earn on the #1 R$ social casino."
      }), (0, a.jsxs)("section", {
        className: n.default.rewards, children: [(0, a.jsx)(c.default, {

        }), (0, a.jsx)("div", {
          className: n.default.rakebackTiles, children: x?f.map(e => {
            let t = x[e.key], r = t?.nextAvailable>0 && t?.nextAvailable>Date.now(), l = v === e.key; return(0, a.jsxs)("div", {
              className: (0, s.default)(n.default.rakebackTile, r && n.default.rakebackTileDisabled), children: [(0, a.jsx)("span", {
                className: n.default.rakebackTileLabel, children: e.label
              }), (0, a.jsxs)("span", {
                className: n.default.rakebackTileAmount, children: [(0, a.jsx)(m.default, {
                  className: n.default.rakebackTileCurrency
                }), t?.coins?.toFixed(2) ?? "0.00"]
              }), (0, a.jsx)(i.default, {
                disabled: r || !y || l, onClick: () => R(e.key), className: n.default.rakebackTileButton, variant: "primary", children: l?"Claiming...": r?(0, a.jsx)(k.default, {
                  date: t?.nextAvailable, renderer: b
                }): "Claim"
              })]
            }, e.key)
          }): [, , , , ].fill(0).map((e, t) => (0, a.jsx)(h.Skeleton, {
            className: n.default.rakebackTile, variant: "rectangular", animation: "wave", height: 140
          }, t))
        })]
      })]
    })
  }; p.getLayout = function(e) {
    return(0, a.jsx)(r.default, {
      children: e
    })
  }; let w = (0, o.connect)(e => ( {
    user: e.auth.user, isAuthenticated: e.auth.isAuthenticated
  }))(p); e.s(["RakebackRewards", 0, p, "default", 0, w])
}, 78766, (e, a, t) => {
  let s = "/rewards/rakeback"; (window.__NEXT_P = window.__NEXT_P || []).push([s, () => e.r(863212)]), a.hot && a.hot.dispose(function() {
    window.__NEXT_P.push([s])
  })
}, 915468, e => {
  e.v(a => Promise.all(["static/chunks/2b31dd2fdb376617.js"].map(a => e.l(a))).then(() => a(900070)))
}, 382497, e => {
  e.v(a => Promise.all(["static/chunks/2576771ba550fccd.js"].map(a => e.l(a))).then(() => a(158629)))
}, 888039, e => {
  e.v(a => Promise.all(["static/chunks/ea56871bdfd31838.css", "static/chunks/d1929370c9df855b.js"].map(a => e.l(a))).then(() => a(256815)))
}, 109801, e => {
  e.v(a => Promise.all(["static/chunks/0db4b752b2726746.css", "static/chunks/f1a28ffa16668bdd.js"].map(a => e.l(a))).then(() => a(554052)))
}, 722267, e => {
  e.v(a => Promise.all(["static/chunks/673cf1291872382e.js"].map(a => e.l(a))).then(() => a(855713)))
}, 458105, e => {
  e.v(a => Promise.all(["static/chunks/fbe05d8a774541fc.js"].map(a => e.l(a))).then(() => a(747709)))
}, 803842, e => {
  e.v(a => Promise.all(["static/chunks/b1e0fb416bdd569a.css", "static/chunks/924f3ee9e84eaa34.js"].map(a => e.l(a))).then(() => a(787597)))
}, 647812, e => {
  e.v(a => Promise.all(["static/chunks/d78bc5b32b65f3c9.css", "static/chunks/df1b69ab7c1a9d57.js"].map(a => e.l(a))).then(() => a(170227)))
}, 196037, e => {
  e.v(a => Promise.all(["static/chunks/06e94455bd93a867.js"].map(a => e.l(a))).then(() => a(631250)))
}, 847965, e => {
  e.v(a => Promise.all(["static/chunks/79fa5c3e401edf2a.js"].map(a => e.l(a))).then(() => a(281102)))
}, 736131, e => {
  e.v(a => Promise.all(["static/chunks/e95ce2c16171a33b.js"].map(a => e.l(a))).then(() => a(374161)))
}, 156381, e => {
  e.v(a => Promise.all(["static/chunks/fee5c0daaf6bbb0d.js"].map(a => e.l(a))).then(() => a(975265)))
}, 715790, e => {
  e.v(a => Promise.all(["static/chunks/f78b786f0aa4b0eb.js"].map(a => e.l(a))).then(() => a(9785)))
}, 666631, e => {
  e.v(a => Promise.all(["static/chunks/5a231b4c32f64fe3.js"].map(a => e.l(a))).then(() => a(250748)))
}, 751241, e => {
  e.v(a => Promise.all(["static/chunks/7597357cbc5996ab.js"].map(a => e.l(a))).then(() => a(87589)))
}]);