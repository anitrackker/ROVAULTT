(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document?document.currentScript: void 0, 447106, e => {
  "use strict"; var a = e.i(478902), t = e.i(389959), l = e.i(94751), s = e.i(944967); e.i(802398); var i = e.i(565252), o = e.i(890646), n = e.i(692742), d = e.i(372045), r = e.i(474861), u = e.i(359566), c = e.i(965783), p = e.i(356535), f = e.i(177044), h = e.i(907153), m = e.i(788714), y = e.i(263203), x = e.i(376339), g = e.i(704884), j = e.i(507689), w = e.i(770381); l.default.setAppElement("#__next"); let C = (0, m.default)(() => e.A(209977), {
    loadableGenerated: {
      modules: [958439]
    }, ssr: !1
  }), R = (0, m.default)(() => e.A(720063), {
    loadableGenerated: {
      modules: [978488]
    }, ssr: !1
  }), b = () => (0, a.jsxs)("svg", {
    width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", "aria-hidden": !0, children: [(0, a.jsx)("path", {
      d: "M6 6l6 6-6 6", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round"
    }), (0, a.jsx)("path", {
      d: "M13 6l6 6-6 6", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round"
    })]
  }), N = (0, i.connect)(e => ( {
    showWithdraw: e.auth.showWithdraw
  }))(function( {
    className: e, showWithdraw: m
  }) {
    let[N, M] = (0, t.useState)(!1), [v, O] = (0, t.useState)(null), [I, T] = (0, t.useState)(!1), W = (0, i.useDispatch)(), k = (0, f.useRouter)(), S = t.default.useMemo(() => (0, u.getGapWidth)("margin"), ["margin"]); (0, i.useSelector)(e => e.auth.user); let L = (0, i.useSelector)(e => e.auth.wallet), F = (0, i.useSelector)(e => e.auth.currentCurrency) || "FLIPCOINS", A = (0, i.useSelector)(e => e.auth.coinsToRobuxRate || e.auth.rates?.coinsToRobux || .35), B = "FLIPCOINS" === F, D = (0, w.getWalletBalance)(L, "ROCOINS"); (0, w.getWalletBalance)(L, "FLIPCOINS"); let H = A?Math.ceil(7/A): 7, _ = D >= H, q = `You need at least ${(0,g.default)((0,j.default)(H.toString(),2))} RoCoins to withdraw Robux.`, P = () => {
      Y(), W( {
        type: p.SHOW_CURRENCY_WIZARD
      })
    }; function Y() {
      W( {
        type: p.HIDE_WITHDRAW
      }), M(!1), O(null), document.body.style.overflow = "initial", document.body.style.paddingRight = "0px"
    }
    (0, t.useEffect)(() => {
      m?(T(!0), O(null), fetch("/api/user").then(e => e.json()).then(e => {
        if(e.success && e.wallet?.playRequirements) {
          let a = e.wallet.playRequirements[F] ?? 0; O(a>0?a: 0)
        }else O(0)
      }).catch(() => O(0)).finally(() => T(!1)), M(!0), setTimeout(() => {
        document.body.style.overflow = "hidden", document.body.style.paddingRight = S.gap + "px"
      }, 0)): Y()
    }, [m]); let E = null !== v && v>0, G = "ROCOINS" === F?x.default: y.default; return(0, a.jsxs)(a.Fragment, {
      children: [(0, a.jsx)(C, {

      }), (0, a.jsx)(R, {

      }), (0, a.jsxs)(l.default, {
        isOpen: N, onRequestClose: Y, contentLabel: "Withdraw modal", className: (0, s.default)(c.default.defaultModal, c.default.modalMoneyManage, c.default.modalMoneyManageWithdraw, e), closeTimeoutMS: 200, children: [I?(0, a.jsx)("div", {
          style: {
            display: "flex", justifyContent: "center", alignItems: "center", minHeight: 200
          }, children: (0, a.jsx)(d.default, {
            textType: "regular14", element: "p", style: {
              color: "var(--color-grey-secondary)"
            }, children: "Loading..."
          })
        }): E?(0, a.jsxs)(a.Fragment, {
          children: [(0, a.jsx)(r.default, {
            style: {
              marginBottom: "1em"
            }, element: "h2", className: c.default.modalMoneyManageTitle, children: "Withdraw"
          }), (0, a.jsx)("div", {
            className: c.default.playReqCard, children: (0, a.jsxs)("div", {
              className: c.default.playReqContent, children: [(0, a.jsx)("span", {
                className: c.default.playReqTitle, children: "Play Requirement Not Met"
              }), (0, a.jsxs)("p", {
                className: c.default.playReqDescription, children: ["To unlock withdrawals, you need to wager at least", " ", (0, a.jsxs)("span", {
                  className: c.default.playReqAmount, children: [(0, a.jsx)(G, {
                    viewBox: "ROCOINS" === F?"0 0 18 19": "0 0 17 19"
                  }), (0, g.default)((0, j.default)(v.toString(), 2))]
                }), " ", "more in ", "ROCOINS" === F?"RoCoins": "FlipCoins", " by playing games."]
              }), (0, a.jsx)("div", {
                className: c.default.playReqActions, children: (0, a.jsx)(h.default, {
                  variant: "primary", onClick: () => {
                    Y()
                  }, children: "Play Games"
                })
              })]
            })
          })]
        }): (0, a.jsxs)(a.Fragment, {
          children: [(0, a.jsxs)("div", {
            className: c.default.modalMoneyManageHeader, children: [(0, a.jsx)(r.default, {
              element: "h2", className: c.default.modalMoneyManageTitle, children: "What would you like to withdraw?"
            }), (0, a.jsx)("button", {
              type: "button", className: c.default.depositLink, onClick: P, children: "What's the difference?"
            })]
          }), (0, a.jsx)(d.default, {
            element: "p", textType: "regular14", className: c.default.modalWithdrawText, children: "Robux and limited withdrawals use RoCoins. Crypto withdrawals use FlipCoins. Swap FlipCoins to RoCoins when you need more RoCoins."
          }), (0, a.jsxs)("div", {
            className: c.default.modalMoneyManageOptions, children: ["ROCOINS" === F && (0, a.jsxs)(h.default, {
              onClick: () => {
                _?W( {
                  type: p.SHOW_ROBUX_WITHDRAW
                }): n.toast.error(q)
              }, className: (0, s.default)(c.default.modalMoneyManageOptionsItem, !_ && c.default.withdrawOptionDisabled), "aria-disabled": !_, title: _?void 0: q, children: [(0, a.jsx)(d.default, {
                textType: "regular16", element: "p", children: "Robux"
              }), (0, a.jsx)("span", {
                className: c.default.depositReceiveLabel, children: (0, a.jsx)(x.default, {
                  viewBox: "0 0 18 19"
                })
              }), (0, a.jsx)("div", {
                className: c.default.modalMoneyManageOptionsItemIllustration, children: (0, a.jsx)(o.default, {
                  src: "/backgrounds/modals/deposit/options/robux.png", layout: "fill", alt: "Logotype"
                })
              })]
            }), "ROCOINS" === F && (0, a.jsxs)(h.default, {
              onClick: () => {
                _?(Y(), k.push("/limiteds")): n.toast.error("You can only withdraw limiteds using RoCoins.")
              }, className: (0, s.default)(c.default.modalMoneyManageOptionsItem, !_ && c.default.cryptoWithdrawDisabled), "aria-disabled": !_, title: _?void 0: "You cannot withdraw crypto using RoCoins please change to FlipCoins.", children: [(0, a.jsx)(d.default, {
                textType: "regular16", element: "p", children: "Limiteds"
              }), (0, a.jsx)("span", {
                className: c.default.depositReceiveLabel, children: (0, a.jsx)(x.default, {
                  viewBox: "0 0 17 19"
                })
              }), (0, a.jsx)("div", {
                className: c.default.modalMoneyManageOptionsItemIllustration, children: (0, a.jsx)(o.default, {
                  src: "/backgrounds/modals/deposit/options/roblox-items.png", layout: "fill", alt: "Crypto"
                })
              })]
            }), B && (0, a.jsxs)(h.default, {
              onClick: () => {
                B?W( {
                  type: p.SHOW_CRYPTO_WITHDRAW
                }): n.toast.error("You cannot withdraw crypto using RoCoins please change to FlipCoins.")
              }, className: (0, s.default)(c.default.modalMoneyManageOptionsItem, !B && c.default.cryptoWithdrawDisabled), "aria-disabled": !B, title: B?void 0: "You cannot withdraw crypto using RoCoins please change to FlipCoins.", children: [(0, a.jsx)(d.default, {
                textType: "regular16", element: "p", children: "Crypto"
              }), (0, a.jsx)("span", {
                className: c.default.depositReceiveLabel, children: (0, a.jsx)(y.default, {
                  viewBox: "0 0 17 19"
                })
              }), (0, a.jsx)("div", {
                className: c.default.modalMoneyManageOptionsItemIllustration, children: (0, a.jsx)(o.default, {
                  src: "/backgrounds/modals/deposit/options/crypto.png", layout: "fill", alt: "Crypto"
                })
              })]
            }), B && (0, a.jsxs)(h.default, {
              onClick: () => {
                B?(Y(), k.push("/giftcards")): n.toast.error("You cannot withdraw giftcards using RoCoins please change to FlipCoins.")
              }, className: (0, s.default)(c.default.modalMoneyManageOptionsItem, !B && c.default.cryptoWithdrawDisabled), "aria-disabled": !B, title: B?void 0: "You cannot withdraw giftcards using RoCoins please change to FlipCoins.", children: [(0, a.jsx)(d.default, {
                textType: "regular16", element: "p", children: "Giftcards"
              }), (0, a.jsx)("span", {
                className: c.default.depositReceiveLabel, children: (0, a.jsx)(y.default, {
                  viewBox: "0 0 17 19"
                })
              }), (0, a.jsx)("div", {
                className: c.default.modalMoneyManageOptionsItemIllustration, children: (0, a.jsx)(o.default, {
                  src: "/backgrounds/modals/deposit/options/giftcards.png", layout: "fill", alt: "Crypto"
                })
              })]
            }), (0, a.jsxs)("button", {
              type: "button", className: (0, s.default)(c.default.modalMoneyManageOptionsItem, c.default.withdrawTransferTile), onClick: () => {
                W( {
                  type: p.HIDE_WITHDRAW
                }), W( {
                  type: p.SHOW_TRANSFER, payload: {
                    depositCurrency: "ro", direction: "flip-to-ro", returnTo: "withdraw"
                  }
                })
              }, children: [(0, a.jsx)(d.default, {
                textType: "regular16", element: "p", children: "Swap For RoCoins"
              }), (0, a.jsxs)("div", {
                className: (0, s.default)(c.default.modalMoneyManageOptionsItemIllustration, c.default.withdrawTransferTileArt), children: [(0, a.jsx)(y.default, {
                  viewBox: "0 0 17 19"
                }), (0, a.jsx)("span", {
                  className: c.default.withdrawTransferTileArrow, children: (0, a.jsx)(b, {

                  })
                }), (0, a.jsx)(x.default, {
                  viewBox: "0 0 18 19"
                })]
              })]
            })]
          }), (0, a.jsx)("button", {
            type: "button", className: c.default.depositLinkMobile, onClick: P, children: "What's the difference?"
          })]
        }), (0, a.jsx)(h.default, {
          onClick: Y, className: c.default.defaultModalClose, "aria-label": "Close"
        })]
      })]
    })
  }); e.s(["default", 0, N])
}, 855713, e => {
  e.n(e.i(447106))
}, 209977, e => {
  e.v(a => Promise.all(["static/chunks/a78fa0544d8f3c49.js"].map(a => e.l(a))).then(() => a(958439)))
}, 720063, e => {
  e.v(a => Promise.all(["static/chunks/cf6b18ef0c5e9b27.js"].map(a => e.l(a))).then(() => a(978488)))
}]);