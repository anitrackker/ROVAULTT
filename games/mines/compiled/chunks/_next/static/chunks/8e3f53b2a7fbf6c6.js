(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document?document.currentScript: void 0, 35269, e => {
  "use strict"; e.i(824626); var a = e.i(433886), l = e.i(166852), s = e.i(389959), r = e.i(197649), t = e.i(242973), d = e.i(26909), i = e.i(221283), n = e.i(632683), o = e.i(49507), c = e.i(915393), u = e.i(10950), m = e.i(794678); function _(e) {
    return(0, m.default)("MuiSkeleton", e)
  }
  (0, u.default)("MuiSkeleton", ["root", "text", "rectangular", "rounded", "circular", "pulse", "wave", "withChildren", "fitContent", "heightAuto"]); var h = e.i(478902); let f = ["animation", "className", "component", "height", "style", "variant", "width"], v = e => e, b, p, w, g, y = (0, t.keyframes)(b || (b = v`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)), k = (0, t.keyframes)(p || (p = v`
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
`)), x = (0, o.default)("span", {
    name: "MuiSkeleton", slot: "Root", overridesResolver: (e, a) => {
      let {
        ownerState: l
      }
      = e; return[a.root, a[l.variant], !1 !== l.animation && a[l.animation], l.hasChildren && a.withChildren, l.hasChildren && !l.width && a.fitContent, l.hasChildren && !l.height && a.heightAuto]
    }
  })(( {
    theme: e, ownerState: a
  }) => {
    var s, r; let t = String(e.shape.borderRadius).match(/[\d.\-+]*\s*(.*)/)[1] || "px", d = parseFloat(e.shape.borderRadius); return(0, l.default)( {
      display: "block", backgroundColor: e.vars?e.vars.palette.Skeleton.bg: (s = e.palette.text.primary, r = "light" === e.palette.mode?.11: .13, s = function e(a) {
        let l; if(a.type)return a; if("#" === a.charAt(0)) {
          var s; let l, r; return e((s = (s = a).slice(1), l = RegExp(`.{1,${s.length>=6?2:1}}`, "g"), (r = s.match(l)) && 1 === r[0].length && (r = r.map(e => e + e)), r?`rgb${4===r.length?"a":""}(${r.map((e,a)=>a<3?parseInt(e,16):Math.round(parseInt(e,16)/255*1e3)/1e3).join(", ")})`: ""))
        }
        let r = a.indexOf("("), t = a.substring(0, r); if(-1 === ["rgb", "rgba", "hsl", "hsla", "color"].indexOf(t))throw Error((0, i.default)(9, a)); let d = a.substring(r + 1, a.length - 1); if("color" === t) {
          if(l = (d = d.split(" ")).shift(), 4 === d.length && "/" === d[3].charAt(0) && (d[3] = d[3].slice(1)), -1 === ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(l))throw Error((0, i.default)(10, l))
        }else d = d.split(","); return {
          type: t, values: d = d.map(e => parseFloat(e)), colorSpace: l
        }
      }
      (s), r = function(e, a = 0, l = 1) {
        return(0, n.default)(e, a, l)
      }
      (r), ("rgb" === s.type || "hsl" === s.type) && (s.type += "a"), "color" === s.type?s.values[3] = `/${r}`: s.values[3] = r, function(e) {
        let {
          type: a, colorSpace: l
        }
        = e, {
          values: s
        }
        = e; return - 1 !== a.indexOf("rgb")?s = s.map((e, a) => a<3?parseInt(e, 10): e): -1 !== a.indexOf("hsl") && (s[1] = `${s[1]}%`, s[2] = `${s[2]}%`), s = -1 !== a.indexOf("color")?`${l} ${s.join(" ")}`: `${s.join(", ")}`, `${a}(${s})`
      }
      (s)), height: "1.2em"
    }, "text" === a.variant && {
      marginTop: 0, marginBottom: 0, height: "auto", transformOrigin: "0 55%", transform: "scale(1, 0.60)", borderRadius: `${d}${t}/${Math.round(d/.6*10)/10}${t}`, "&:empty:before": {
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
  }) => "pulse" === e.animation && (0, t.css)(w || (w = v`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `), y), ( {
    ownerState: e, theme: a
  }) => "wave" === e.animation && (0, t.css)(g || (g = v`
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
    `), k, (a.vars || a).palette.action.hover)), j = s.forwardRef(function(e, s) {
    let t = (0, c.useDefaultProps)( {
      props: e, name: "MuiSkeleton"
    }), {
      animation: i = "pulse", className: n, component: o = "span", height: u, style: m, variant: v = "text", width: b
    }
    = t, p = (0, a.default)(t, f), w = (0, l.default)( {

    }, t, {
      animation: i, component: o, variant: v, hasChildren: !!p.children
    }), g = (e => {
      let {
        classes: a, variant: l, animation: s, hasChildren: r, width: t, height: i
      }
      = e; return(0, d.default)( {
        root: ["root", l, s, r && "withChildren", r && !t && "fitContent", r && !i && "heightAuto"]
      }, _, a)
    })(w); return(0, h.jsx)(x, (0, l.default)( {
      as: o, ref: s, className: (0, r.default)(g.root, n), ownerState: w
    }, p, {
      style: (0, l.default)( {
        width: b, height: u
      }, m)
    }))
  }); e.s(["Skeleton", 0, j], 35269)
}, 273798, e => {
  e.v( {
    rewardsNav: "rewardsNav-module-scss-module__i0zZiG__rewardsNav"
  })
}, 333405, e => {
  "use strict"; var a = e.i(478902), l = e.i(329379), s = e.i(177044), r = e.i(907153), t = e.i(273798); function d() {
    let e = (0, s.useRouter)().pathname; return(0, a.jsx)("nav", {
      className: t.default.rewardsNav, children: [ {
        href: "/rewards/rakeback", label: "Rakeback", match: "/rewards/rakeback"
      }, {
        href: "/rewards/keys", label: "Key Cases", match: "/rewards/keys"
      }, {
        href: "/rewards/levels", label: "Level Rewards", match: "/rewards/levels"
      }].map(s => (0, a.jsx)(l.default, {
        href: s.href, passHref: !0, legacyBehavior: !0, children: (0, a.jsx)(r.default, {
          as: "a", title: s.label, variant: "tab", isActive: e.startsWith(s.match), children: s.label
        })
      }, s.href))
    })
  }
  e.s(["default", () => d])
}, 887079, e => {
  e.v( {
    levelHero: "Rewards-module-scss-module__Qn2yBa__levelHero", levelHeroCircle: "Rewards-module-scss-module__Qn2yBa__levelHeroCircle", levelHeroContent: "Rewards-module-scss-module__Qn2yBa__levelHeroContent", rakebackTile: "Rewards-module-scss-module__Qn2yBa__rakebackTile", rakebackTileAmount: "Rewards-module-scss-module__Qn2yBa__rakebackTileAmount", rakebackTileButton: "Rewards-module-scss-module__Qn2yBa__rakebackTileButton", rakebackTileCurrency: "Rewards-module-scss-module__Qn2yBa__rakebackTileCurrency", rakebackTileDisabled: "Rewards-module-scss-module__Qn2yBa__rakebackTileDisabled", rakebackTileLabel: "Rewards-module-scss-module__Qn2yBa__rakebackTileLabel", rakebackTiles: "Rewards-module-scss-module__Qn2yBa__rakebackTiles", rewards: "Rewards-module-scss-module__Qn2yBa__rewards", rewardsBanner: "Rewards-module-scss-module__Qn2yBa__rewardsBanner", rewardsBannerTitle: "Rewards-module-scss-module__Qn2yBa__rewardsBannerTitle", rewardsCaution: "Rewards-module-scss-module__Qn2yBa__rewardsCaution", rewardsCautionText: "Rewards-module-scss-module__Qn2yBa__rewardsCautionText", rewardsNav: "Rewards-module-scss-module__Qn2yBa__rewardsNav", robuxCurrency: "Rewards-module-scss-module__Qn2yBa__robuxCurrency"
  })
}, 210740, e => {
  e.v( {
    badge: "levelProgressBar-module-scss-module__-6cGyG__badge", badgeLabel: "levelProgressBar-module-scss-module__-6cGyG__badgeLabel", badgeNumber: "levelProgressBar-module-scss-module__-6cGyG__badgeNumber", barInfo: "levelProgressBar-module-scss-module__-6cGyG__barInfo", barLevel: "levelProgressBar-module-scss-module__-6cGyG__barLevel", barPercent: "levelProgressBar-module-scss-module__-6cGyG__barPercent", barWrapper: "levelProgressBar-module-scss-module__-6cGyG__barWrapper", container: "levelProgressBar-module-scss-module__-6cGyG__container", progressFill: "levelProgressBar-module-scss-module__-6cGyG__progressFill", progressTrack: "levelProgressBar-module-scss-module__-6cGyG__progressTrack"
  })
}, 39979, e => {
  e.v( {
    amount: "levelRewardCard-module-scss-module__894_Va__amount", amountClaimed: "levelRewardCard-module-scss-module__894_Va__amountClaimed", amountIcon: "levelRewardCard-module-scss-module__894_Va__amountIcon", card: "levelRewardCard-module-scss-module__894_Va__card", claimButton: "levelRewardCard-module-scss-module__894_Va__claimButton", claimButtonIcon: "levelRewardCard-module-scss-module__894_Va__claimButtonIcon", claimable: "levelRewardCard-module-scss-module__894_Va__claimable", claimed: "levelRewardCard-module-scss-module__894_Va__claimed", info: "levelRewardCard-module-scss-module__894_Va__info", locked: "levelRewardCard-module-scss-module__894_Va__locked", strikethrough: "levelRewardCard-module-scss-module__894_Va__strikethrough", title: "levelRewardCard-module-scss-module__894_Va__title"
  })
}, 203523, e => {
  e.v( {
    empty: "levelRewardsList-module-scss-module__ziS5WG__empty", list: "levelRewardsList-module-scss-module__ziS5WG__list"
  })
}, 629685, e => {
  "use strict"; var a = e.i(478902), l = e.i(389959); e.i(802398); var s = e.i(565252), r = e.i(383312), t = e.i(333405), d = e.i(474861), i = e.i(372045), n = e.i(210740); function o() {
    let e = (0, s.useSelector)(e => e.auth.loadingLevels) ?? !1, l = (0, s.useSelector)(e => e.auth.userLevel), r = (0, s.useSelector)(e => e.auth.user?.level), t = (0, s.useSelector)(e => e.auth.percentageToNextLevel), o = l ?? r ?? 0, c = t ?? 0; return e && null == l?null: (0, a.jsxs)("div", {
      className: n.default.container, children: [(0, a.jsx)("div", {
        className: n.default.badge, children: (0, a.jsx)(d.default, {
          element: "h2", className: n.default.badgeNumber, children: o
        })
      }), (0, a.jsxs)(i.default, {
        element: "span", textType: "semibold14", className: n.default.badgeLabel, children: ["Level ", o]
      }), (0, a.jsxs)("div", {
        className: n.default.barWrapper, children: [(0, a.jsx)("div", {
          className: n.default.progressTrack, children: (0, a.jsx)("div", {
            className: n.default.progressFill, style: {
              width: `${c}%`
            }
          })
        }), (0, a.jsxs)("div", {
          className: n.default.barInfo, children: [(0, a.jsxs)(i.default, {
            element: "span", textType: "regular14", className: n.default.barLevel, children: ["Level ", o]
          }), (0, a.jsxs)(i.default, {
            element: "span", textType: "regular14", className: n.default.barPercent, children: [Math.round(c), "%"]
          }), (0, a.jsxs)(i.default, {
            element: "span", textType: "regular14", className: n.default.barLevel, children: ["Level ", o + 1]
          })]
        })]
      })]
    })
  }
  var c = e.i(35269), u = e.i(944967), m = e.i(692742), _ = e.i(907153), h = e.i(56040), f = e.i(356535), v = e.i(263203), b = e.i(39979); function p( {
    reward: e
  }) {
    let[r, t] = (0, l.useState)(!1), i = (0, s.useDispatch)(), n = async() => {
      t(!0); try {
        let a = await (0, h.claimLevelReward)(e.level); if(a.success) {
          if(i( {
            type: f.MARK_LEVEL_CLAIMED, payload: e.level
          }), m.toast.success(`Claimed Level ${e.level} reward: ${a.rewardAmount.toLocaleString()} coins!`), a.gameEvents)for(let e of a.gameEvents)i( {
            type: f.WALLET_CHANGE, payload: {
              id: e._id, amount: e.amount, currency: e.currency
            }
          })
        }else m.toast.error(a.message || "Failed to claim reward")
      }catch(e) {
        m.toast.error(e?.response?.data?.msg || "Failed to claim reward. Please try again.")
      }finally {
        t(!1)
      }
    }; return e.claimed?(0, a.jsxs)("div", {
      className: (0, u.default)(b.default.card, b.default.claimed), children: [(0, a.jsx)("div", {
        className: b.default.info, children: (0, a.jsxs)(d.default, {
          element: "h4", className: b.default.title, children: ["Level ", e.level]
        })
      }), (0, a.jsxs)("div", {
        className: b.default.amountClaimed, children: [(0, a.jsx)(v.default, {
          className: b.default.amountIcon
        }), (0, a.jsx)("span", {
          className: b.default.strikethrough, children: e.rewardAmount.toLocaleString()
        })]
      })]
    }): e.canClaim?(0, a.jsxs)("div", {
      className: (0, u.default)(b.default.card, b.default.claimable), children: [(0, a.jsx)("div", {
        className: b.default.info, children: (0, a.jsxs)(d.default, {
          element: "h4", className: b.default.title, children: ["Level ", e.level]
        })
      }), (0, a.jsx)(_.default, {
        variant: "primary", onClick: n, disabled: r, className: b.default.claimButton, children: r?"...": (0, a.jsxs)(a.Fragment, {
          children: ["Claim ", (0, a.jsx)(v.default, {
            className: b.default.claimButtonIcon
          }), e.rewardAmount.toLocaleString()]
        })
      })]
    }): (0, a.jsxs)("div", {
      className: (0, u.default)(b.default.card, b.default.locked), children: [(0, a.jsx)("div", {
        className: b.default.info, children: (0, a.jsxs)(d.default, {
          element: "h4", className: b.default.title, children: ["Level ", e.level]
        })
      }), (0, a.jsxs)("div", {
        className: b.default.amount, children: [(0, a.jsx)(v.default, {
          className: b.default.amountIcon
        }), e.rewardAmount.toLocaleString()]
      })]
    })
  }
  var w = e.i(203523); function g() {
    let e = (0, s.useSelector)(e => e.auth.levelRewards) ?? [], r = (0, s.useSelector)(e => e.auth.loadingLevels) ?? !1, t = (0, l.useRef)(null); if((0, l.useEffect)(() => {
      if(!t.current)return; let e = setTimeout(() => {
        t.current?.scrollIntoView( {
          behavior: "smooth", block: "center"
        })
      }, 500); return() => clearTimeout(e)
    }, [e]), r)return(0, a.jsx)("div", {
      className: w.default.list, children: [, , , , , ].fill(0).map((e, l) => (0, a.jsx)(c.Skeleton, {
        style: {
          borderRadius: "12px"
        }, variant: "rectangular", width: "100%", height: 64
      }, l))
    }); if(0 === e.length)return(0, a.jsx)("div", {
      className: w.default.empty, children: (0, a.jsx)(i.default, {
        element: "p", textType: "regular16", children: "No level rewards available."
      })
    }); let d = e.find(e => e.canClaim), n = e.find(e => !e.claimed && !e.canClaim), o = d?.level || n?.level; return(0, a.jsx)("div", {
      className: w.default.list, children: [...e].sort((e, a) => e.level - a.level).map(e => (0, a.jsx)("div", {
        ref: e.level === o?t: void 0, children: (0, a.jsx)(p, {
          reward: e
        })
      }, e.level))
    })
  }
  var y = e.i(887079); let k = ( {
    isAuthenticated: e
  }) => {
    let r = (0, s.useDispatch)(); return(0, l.useEffect)(() => {
      e && (async() => {
        r( {
          type: f.SET_LOADING_LEVELS, payload: !0
        }); try {
          let e = await (0, h.fetchLevelRewards)(); e.success && r( {
            type: f.SET_LEVEL_REWARDS, payload: {
              rewards: e.rewards, userLevel: e.userLevel, percentageToNextLevel: e.percentageToNextLevel
            }
          })
        }catch(e) {
          console.error("Failed to load level rewards:", e)
        }finally {
          r( {
            type: f.SET_LOADING_LEVELS, payload: !1
          })
        }
      })()
    }, [e, r]), (0, a.jsxs)("section", {
      className: y.default.rewards, children: [(0, a.jsx)(t.default, {

      }), (0, a.jsxs)("div", {
        className: y.default.levelHero, children: [(0, a.jsx)("div", {
          className: y.default.levelHeroCircle
        }), (0, a.jsx)("div", {
          className: y.default.levelHeroContent, children: (0, a.jsx)(o, {

          })
        })]
      }), (0, a.jsx)(g, {

      })]
    })
  }; k.getLayout = function(e) {
    return(0, a.jsx)(r.default, {
      children: e
    })
  }; let x = (0, s.connect)(e => ( {
    user: e.auth.user, isAuthenticated: e.auth.isAuthenticated
  }))(k); e.s(["LevelRewardsPage", 0, k, "default", 0, x], 629685)
}, 828237, (e, a, l) => {
  let s = "/rewards/levels"; (window.__NEXT_P = window.__NEXT_P || []).push([s, () => e.r(629685)]), a.hot && a.hot.dispose(function() {
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