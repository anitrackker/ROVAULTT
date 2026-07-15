(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document?document.currentScript: void 0, 815294, e => {
  "use strict"; var t = e.i(478902), o = e.i(389959), a = e.i(94751), l = e.i(944967), i = e.i(907153), s = e.i(372045), n = e.i(474861), r = e.i(359566), u = e.i(965783); e.i(802398); var d = e.i(565252), h = e.i(356535); let c = [ {
    label: "What is Bloxflip?", values: ["Bloxflip is the #1 social casino for wagering FlipCoins! Deposit fiat, crypto, FlipCoins, and limiteds to receive a balance on the site to start playing. Cash out your FlipCoins into your account or choose from our large selection of limiteds to cash out as well."]
  }, {
    label: "How do I deposit FlipCoins to play?", values: ["Click on the top right and press the plus button. You will have different options for depositing on the website."]
  }, {
    label: "How do I know that the games are fair?", values: ["At Bloxflip, we utilize provably fair technology for all our game modes, so it’s mathematically proven that all our games are fair. We utilize the EOS blockchain to generate random numbers for each game. We have a flat 5% house edge on all our game modes."]
  }, {
    label: "Help! There is an issue with the site and I’m not sure what to do!", values: ["Contact our support team by clicking the Live Chat button on the top bar of the page. A support agent will guide you through solving whatever problem you’re experiencing. Alternatively, you can join our Discord and ask for help there."]
  }, {
    label: "How do I tip?", values: ["Use the command “.tip (username) (amount)” in the chat without quotes to send a tip to another user. This sends FlipCoins to their account. Please note, if you have more than three accounts, you will be prohibited from tipping."]
  }, {
    label: "How do I rain?", values: ["Use the command “.rain (amount)” in the chat without quotes to rain your FlipCoins to other users!"]
  }, {
    label: "Is this legal?", values: ["Bloxflip is a completely legal social casino and is registered under the company entity “Bloxflip.” For more information, view our terms of service."]
  }, {
    label: "I have a business or legal inquiry", values: ["support@bloxflip.com"]
  }]; a.default.setAppElement("#__next"); let m = (0, d.connect)(e => ( {
    showFaq: e.auth.showFaq
  }))(function( {
    className: e, showFaq: m
  }) {
    let[p, f] = (0, o.useState)(!1), g = (0, d.useDispatch)(), y = o.default.useMemo(() => (0, r.getGapWidth)("margin"), ["margin"]); function b() {
      g( {
        type: h.HIDE_FAQ
      }), f(!1), document.body.style.overflow = "initial", document.body.style.paddingRight = "0px"
    }
    return(0, o.useEffect)(() => {
      m?(f(!0), setTimeout(() => {
        document.body.style.overflow = "hidden", document.body.style.paddingRight = y.gap + "px"
      }, 0)): !1 === m && b()
    }, [m]), (0, t.jsx)(t.Fragment, {
      children: (0, t.jsxs)(a.default, {
        isOpen: p, onRequestClose: b, contentLabel: "Withdraw modal", className: (0, l.default)(u.default.defaultModal, u.default.modalWithdraw, e), closeTimeoutMS: 200, children: [(0, t.jsx)(n.default, {
          element: "h2", className: u.default.modalDepositTitle, children: "FAQ"
        }), c.map(( {
          label: e, values: o
        }, a) => (0, t.jsxs)(s.default, {
          className: u.default.modalWithdrawText, element: "p", textType: "regular14", style: {
            margin: "2em 0"
          }, children: [(0, t.jsxs)("b", {
            children: [a + 1, " - ", e]
          }), ".", (0, t.jsx)("div", {
            style: {
              width: "100%"
            }, children: o.map((e, o) => (0, t.jsx)("p", {
              style: {
                margin: ".7em 0"
              }, children: e
            }, o))
          })]
        }, a)), (0, t.jsx)(i.default, {
          style: {
            width: "100%", marginTop: "0em"
          }, variant: "primary", onClick: b, className: u.default.modalWithdrawButton, children: "Close"
        }), (0, t.jsx)(i.default, {
          onClick: b, className: u.default.defaultModalClose, "aria-label": "Close"
        })]
      })
    })
  }); e.s(["default", 0, m])
}, 87589, e => {
  e.n(e.i(815294))
}]);