(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document?document.currentScript: void 0, 465065, e => {
  "use strict"; var t = e.i(478902), a = e.i(389959); e.i(802398); var s = e.i(565252), l = e.i(94751), i = e.i(944967), r = e.i(692742), n = e.i(56040), d = e.i(356535), o = e.i(359566), u = e.i(907153), c = e.i(75730), m = e.i(372045), p = e.i(474861), f = e.i(263203), g = e.i(376339), h = e.i(925904), x = e.i(965783); function y( {
    className: e
  }) {
    let y = (0, s.useDispatch)(), {
      showTipModal: v
    }
    = (0, s.useSelector)(e => e.auth), b = "ROCOINS" === (0, s.useSelector)(e => e.auth.currentCurrency)?g.default: f.default, [j, T] = (0, a.useState)(!1), [I, C] = (0, a.useState)(""), [N, S] = (0, a.useState)(""), [E, R] = (0, a.useState)(!1), A = a.default.useMemo(() => (0, o.getGapWidth)("margin"), ["margin"]), L = () => {
      y( {
        type: d.HIDE_TIP_MODAL
      }), T(!1), R(!1), document.body.style.overflow = "initial", document.body.style.paddingRight = "0px"
    }; (0, a.useEffect)(() => {
      let e = v?.message?.message; if(e) {
        let t = e.trim().split(/\s+/); C(t[1] || ""), S(t[2] || "")
      }
    }, [v?.message?.message]), (0, a.useEffect)(() => {
      v?.show?(T(!0), document.body.style.overflow = "hidden", document.body.style.paddingRight = A.gap + "px"): j && L()
    }, [v?.show]); let w = async() => {
      let e = I.trim(), t = parseInt(N, 10); if(!e)return void r.toast.error("Enter a username"); if(!t || t <= 0)return void r.toast.error("Enter a valid amount"); if(t>25e3)return void r.toast.error("Maximum tip is 25,000 coins"); R(!0); try {
        let a = (await n.API.post("/chat/commands/gift", {
          recipientUsername: e, amount: t, captcha_token: ""
        })).data; if(a.error) {
          r.toast.error(a.error), R(!1); return
        }
        if(a.success) {
          if(r.toast.success(a.message || `Tipped ${t} to ${e}`), a.gameEvents)for(let e of a.gameEvents)y( {
            type: d.WALLET_CHANGE, payload: {
              id: e._id, amount: e.amount, currency: e.currency
            }
          }); L()
        }else r.toast.error(a.message || a.msg || "Failed to send tip"), R(!1)
      }catch(a) {
        let e = a?.response?.data, t = e?.error || e?.message || e?.msg || "Failed to send tip. Try again."; r.toast.error(t), R(!1)
      }
    }; return(0, t.jsxs)(l.default, {
      isOpen: j, onRequestClose: L, contentLabel: "Tip modal", className: (0, i.default)(x.default.defaultModal, x.default.modalChatRules, e), closeTimeoutMS: 200, children: [(0, t.jsx)(p.default, {
        element: "h2", children: "Send Tip"
      }), (0, t.jsxs)(m.default, {
        element: "p", textType: "regular14", style: {
          marginTop: "20px", color: "rgba(255,255,255,0.5)"
        }, children: ["You are about to send", " ", (0, t.jsx)("b", {
          style: {
            color: "#fff"
          }, children: N || "0"
        }), " coins to", " ", (0, t.jsx)("b", {
          style: {
            color: "#fff"
          }, children: I || "..."
        })]
      }), (0, t.jsxs)("div", {
        className: (0, i.default)("customInput"), style: {
          marginTop: "20px"
        }, children: [(0, t.jsx)(m.default, {
          element: "p", textType: "labelsRegular", className: (0, i.default)("customInputLabel"), children: "Recipient"
        }), (0, t.jsxs)("div", {
          className: (0, i.default)("customInputInner"), children: [(0, t.jsx)("div", {
            className: (0, i.default)("customInputIcon"), children: (0, t.jsx)(h.default, {

            })
          }), (0, t.jsx)(c.default, {
            value: I, onChange: e => C(e.target.value), placeholder: "Username", disabled: E, style: {
              paddingLeft: 39
            }
          })]
        })]
      }), (0, t.jsxs)("div", {
        className: (0, i.default)("customInput"), style: {
          marginTop: "12px"
        }, children: [(0, t.jsx)(m.default, {
          element: "p", textType: "labelsRegular", className: (0, i.default)("customInputLabel"), children: "Amount"
        }), (0, t.jsxs)("div", {
          className: (0, i.default)("customInputInner"), children: [(0, t.jsx)("div", {
            className: (0, i.default)("customInputIcon"), children: (0, t.jsx)(b, {

            })
          }), (0, t.jsx)(c.default, {
            type: "number", min: "1", max: "5000", value: N, onChange: e => S(e.target.value), placeholder: "0", disabled: E, style: {
              paddingLeft: 39
            }
          })]
        })]
      }), (0, t.jsxs)("div", {
        className: x.default.btnWrapper, style: {
          marginTop: "20px"
        }, children: [(0, t.jsx)(u.default, {
          variant: "primary", onClick: w, disabled: E, style: {
            width: "100%"
          }, children: E?"Sending...": "Send Tip"
        }), (0, t.jsx)(u.default, {
          variant: "danger", onClick: L, disabled: E, style: {
            width: "100%"
          }, children: "Cancel"
        })]
      }), (0, t.jsx)(u.default, {
        onClick: L, className: x.default.defaultModalClose, "aria-label": "Close"
      })]
    })
  }
  l.default.setAppElement("#__next"), e.s(["default", () => y])
}, 975265, e => {
  e.n(e.i(465065))
}]);