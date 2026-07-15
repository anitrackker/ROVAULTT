(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document?document.currentScript: void 0, 455550, e => {
  "use strict"; function t(e) {
    let t = e?.depositpromo, d = []; for(let e of Array.isArray(t?.promos)?t.promos: [])if("string" == typeof e) {
      let[t, s, a] = e.split(",").map(e => e.trim()); !t || isNaN(Number(s)) || isNaN(Number(a)) || d.push( {
        code: t, deposit: Number(s), reward: Number(a)
      })
    }else e && "string" == typeof e.code && e.code && d.push( {
      code: e.code, deposit: Number(e.deposit) || 0, reward: Number(e.reward) || 0
    }); return {
      enabled: !!t?.enabled && d.length>0, title: "string" == typeof t?.title?t.title: "Deposit Bonuses", promos: d
    }
  }
  e.s(["parseDepositPromosFlag", () => t])
}, 618642, e => {
  e.v( {
    addNewCardOption: "credit-card-module-scss-module__ExpL_q__addNewCardOption", addNewCardOptionCardDetails: "credit-card-module-scss-module__ExpL_q__addNewCardOptionCardDetails", addNewCardOptionCardDetailsWrapper: "credit-card-module-scss-module__ExpL_q__addNewCardOptionCardDetailsWrapper", addNewCardOptionCards: "credit-card-module-scss-module__ExpL_q__addNewCardOptionCards", addNewCardOptionIcon: "credit-card-module-scss-module__ExpL_q__addNewCardOptionIcon", addNewCardOptionWrapper: "credit-card-module-scss-module__ExpL_q__addNewCardOptionWrapper", amountContainer: "credit-card-module-scss-module__ExpL_q__amountContainer", captchaWrapper: "credit-card-module-scss-module__ExpL_q__captchaWrapper", cardActions: "credit-card-module-scss-module__ExpL_q__cardActions", cardDetails: "credit-card-module-scss-module__ExpL_q__cardDetails", cardNumberInput: "credit-card-module-scss-module__ExpL_q__cardNumberInput", cardText: "credit-card-module-scss-module__ExpL_q__cardText", creditCardModalRoot: "credit-card-module-scss-module__ExpL_q__creditCardModalRoot", creditCardOption: "credit-card-module-scss-module__ExpL_q__creditCardOption", creditCardOptions: "credit-card-module-scss-module__ExpL_q__creditCardOptions", creditCardRadio: "credit-card-module-scss-module__ExpL_q__creditCardRadio", cvcInput: "credit-card-module-scss-module__ExpL_q__cvcInput", delete: "credit-card-module-scss-module__ExpL_q__delete", depositDetails: "credit-card-module-scss-module__ExpL_q__depositDetails", depositInfo: "credit-card-module-scss-module__ExpL_q__depositInfo", expiryContainers: "credit-card-module-scss-module__ExpL_q__expiryContainers", expiryCvcContainer: "credit-card-module-scss-module__ExpL_q__expiryCvcContainer", expiryInput: "credit-card-module-scss-module__ExpL_q__expiryInput", inputWithButtons: "credit-card-module-scss-module__ExpL_q__inputWithButtons", modalDepositOptions: "credit-card-module-scss-module__ExpL_q__modalDepositOptions", modalDepositOptionsLabel: "credit-card-module-scss-module__ExpL_q__modalDepositOptionsLabel", modalDepositTitle: "credit-card-module-scss-module__ExpL_q__modalDepositTitle", oneTimePaymentForm: "credit-card-module-scss-module__ExpL_q__oneTimePaymentForm", oneTimePaymentFormWrapper: "credit-card-module-scss-module__ExpL_q__oneTimePaymentFormWrapper", paymentButton: "credit-card-module-scss-module__ExpL_q__paymentButton", predefinedAmounts: "credit-card-module-scss-module__ExpL_q__predefinedAmounts", previewSection: "credit-card-module-scss-module__ExpL_q__previewSection", redeemCurrencySwitcher: "credit-card-module-scss-module__ExpL_q__redeemCurrencySwitcher", redeemCurrencySwitcherArrow: "credit-card-module-scss-module__ExpL_q__redeemCurrencySwitcherArrow", redeemCurrencySwitcherBadge: "credit-card-module-scss-module__ExpL_q__redeemCurrencySwitcherBadge", redeemCurrencySwitcherCard: "credit-card-module-scss-module__ExpL_q__redeemCurrencySwitcherCard", redeemCurrencySwitcherHeader: "credit-card-module-scss-module__ExpL_q__redeemCurrencySwitcherHeader", redeemCurrencySwitcherRail: "credit-card-module-scss-module__ExpL_q__redeemCurrencySwitcherRail", redeemCurrencySwitcherValue: "credit-card-module-scss-module__ExpL_q__redeemCurrencySwitcherValue", redeemDivider: "credit-card-module-scss-module__ExpL_q__redeemDivider", redeemInput: "credit-card-module-scss-module__ExpL_q__redeemInput", redeemInputRow: "credit-card-module-scss-module__ExpL_q__redeemInputRow", redeemSection: "credit-card-module-scss-module__ExpL_q__redeemSection", redeemSuccessActions: "credit-card-module-scss-module__ExpL_q__redeemSuccessActions", redeemSuccessCheck: "credit-card-module-scss-module__ExpL_q__redeemSuccessCheck", redeemSuccessDraw: "credit-card-module-scss-module__ExpL_q__redeemSuccessDraw", redeemSuccessHalo: "credit-card-module-scss-module__ExpL_q__redeemSuccessHalo", redeemSuccessIcon: "credit-card-module-scss-module__ExpL_q__redeemSuccessIcon", redeemSuccessIconWrap: "credit-card-module-scss-module__ExpL_q__redeemSuccessIconWrap", redeemSuccessPop: "credit-card-module-scss-module__ExpL_q__redeemSuccessPop", redeemSuccessPulse: "credit-card-module-scss-module__ExpL_q__redeemSuccessPulse", redeemSuccessStep: "credit-card-module-scss-module__ExpL_q__redeemSuccessStep", redeemSuccessSummary: "credit-card-module-scss-module__ExpL_q__redeemSuccessSummary", rotateIcon: "credit-card-module-scss-module__ExpL_q__rotateIcon", saveCardBox: "credit-card-module-scss-module__ExpL_q__saveCardBox", selected: "credit-card-module-scss-module__ExpL_q__selected", star: "credit-card-module-scss-module__ExpL_q__star", starIcon: "credit-card-module-scss-module__ExpL_q__starIcon", stepContainer: "credit-card-module-scss-module__ExpL_q__stepContainer", transactionDetails: "credit-card-module-scss-module__ExpL_q__transactionDetails", usdInputWrapper: "credit-card-module-scss-module__ExpL_q__usdInputWrapper", usdPrefix: "credit-card-module-scss-module__ExpL_q__usdPrefix"
  })
}, 522762, e => {
  e.v( {
    amountButton: "amount-button-module-scss-module__qWx3Ka__amountButton", bestValueIcon: "amount-button-module-scss-module__qWx3Ka__bestValueIcon", buttonContent: "amount-button-module-scss-module__qWx3Ka__buttonContent", label: "amount-button-module-scss-module__qWx3Ka__label", predefinedAmountsContainer: "amount-button-module-scss-module__qWx3Ka__predefinedAmountsContainer", selected: "amount-button-module-scss-module__qWx3Ka__selected"
  })
}, 147155, e => {
  "use strict"; var t, d = e.i(478902), s = e.i(389959); e.i(802398); var a = e.i(565252), l = e.i(356535), r = e.i(944967), c = e.i(692742), i = e.i(907153), o = e.i(965783), u = e.i(372045), n = e.i(94751), m = e.i(359566), p = e.i(788714); let _ = (0, s.createContext)(void 0), x = ( {
    children: e
  }) => {
    let[t, a] = (0, s.useState)(5); return(0, d.jsx)(_.Provider, {
      value: {
        usdAmount: t, setUsdAmount: a
      }, children: e
    })
  }; var f = e.i(618642), h = e.i(75730), C = e.i(522762); function y() {
    return(y = Object.assign.bind()).apply(null, arguments)
  }
  let j = function(e) {
    return s.createElement("svg", y( {
      width: 20, height: 20, fill: "none", xmlns: "http://www.w3.org/2000/svg"
    }, e), t || (t = s.createElement("path", {
      d: "M10 6.458V5.07m0 1.39H8.611A2.778 2.778 0 0 1 5.833 3.68c0-.767.622-1.389 1.39-1.389A2.778 2.778 0 0 1 10 5.07m0 1.39h1.389a2.778 2.778 0 0 0 2.778-2.779c0-.767-.622-1.389-1.39-1.389A2.778 2.778 0 0 0 10 5.07m0 1.39H3.958a.833.833 0 0 0-.833.833v1.874c0 .46.373.834.833.834M10 6.458h6.042c.46 0 .833.373.833.833v1.875c0 .46-.373.834-.833.834M10 6.458V10m0 6.875H4.792a.833.833 0 0 1-.834-.834V10M10 16.875h5.208c.46 0 .834-.373.834-.834V10M10 16.875V10m0 0h6.042M10 10H3.958m0-.417V10m12.084 0v-.417", stroke: "#818EBB", strokeWidth: 1.5, strokeLinejoin: "round"
    })))
  }, v = ( {
    options: e, selectedAmount: t, onAmountSelect: s
  }) => (0, d.jsx)("div", {
    className: C.default.predefinedAmountsContainer, children: e.map((e, a) => (0, d.jsx)(i.default, {
      className: `${C.default.amountButton} ${t===e.value?C.default.selected:""}`, variant: (e.value, "amount"), onClick: () => {
        s(e.value)
      }, isActive: t === e.value, children: (0, d.jsxs)("div", {
        className: C.default.buttonContent, children: [!e.label && (0, d.jsxs)("span", {
          children: ["$", e.value]
        }), e.isBestValue && (0, d.jsx)(j, {
          className: C.default.bestValueIcon
        }), e.label && (0, d.jsx)("span", {
          className: C.default.label, children: e.label
        })]
      })
    }, a))
  }); var b = e.i(474861), S = e.i(263203), N = e.i(376339); let w = new class {
    initialized = !1; init() {
      window.zaraz && (this.initialized = !0)
    }
    identify(e, t) {
      window.zaraz && (window.zaraz.set("userId", e), t && Object.entries(t).forEach(([e, t]) => {
        window.zaraz?.set(e, t)
      }))
    }
    track(e, t) {
      window.zaraz && window.zaraz.track(e, t)
    }
    getEventProperties() {
      return {

      }
    }
  }; var E = e.i(56040); let R = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, g = [ {
    value: 5
  }, {
    value: 10
  }, {
    value: 25
  }, {
    value: 50
  }, {
    value: 100
  }, {
    value: 250
  }, {
    value: 500
  }], L = () => {
    let e = (0, a.useDispatch)(), {
      usdAmount: t, setUsdAmount: r
    }
    = (() => {
      let e = (0, s.useContext)(_); if(void 0 === e)throw Error("useCreditCardContext must be used within a CreditCardProvider"); return e
    })(), o = (0, a.useSelector)(e => e.auth.cardsDepositWalletCurrency) || "FLIPCOINS", n = (0, a.useSelector)(e => e.auth.currentCurrency) || "FLIPCOINS", [m, p] = (0, s.useState)(t), [x, C] = (0, s.useState)(""), [y, j] = (0, s.useState)(!1), [L, O] = (0, s.useState)(null), [I, D] = (0, s.useState)(null), k = "ROCOINS" === o?"ih_bloxflip_bloxflip_gift_card_rocoins_2389bb36": "ih_bloxflip_bloxflip_gift_card_8cb4d769", q = "string" == typeof m?0: m, T = 500*q, B = q >= 1 && q <= 500, A = (0, a.useSelector)(e => e.auth.coinsToRobuxRate), P = A?Math.floor(T*A/.7): 0, W = e => {
      p(e), r(e)
    }, F = async() => {
      if(R.test(x)) {
        j(!0); try {
          let e = await E.API.post("/user/redeem", {
            code: x
          }), t = e.data.depositAmount, d = "ROCOINS" === e.data.currency?"ROCOINS": "FLIPCOINS"; c.default.success(`Successfully redeemed ${t.toLocaleString()} coins!`), w.track("GIFT_CARD_REDEEMED", {
            amount: t
          }), O(t), D(d), C("")
        }catch(t) {
          let e = t?.response?.data?.error || t?.response?.data?.msg || "Failed to redeem gift card. Please try again."; c.default.error(e)
        }finally {
          j(!1)
        }
      }
    }, M = R.test(x) && !y && null === L, H = "ROCOINS" === I?"ROCOINS": "FLIPCOINS", z = "ROCOINS" === H?N.default: S.default, V = "ROCOINS" === H?"RoCoins": "FlipCoins", $ = "ROCOINS" === n?N.default: S.default; return null !== L?(0, d.jsx)("div", {
      className: f.default.stepContainer, children: (0, d.jsxs)("div", {
        className: f.default.redeemSuccessStep, children: [(0, d.jsx)("div", {
          className: f.default.redeemSuccessIconWrap, children: (0, d.jsx)("span", {
            className: f.default.redeemSuccessIcon, "aria-hidden": "true", children: (0, d.jsx)("span", {
              className: f.default.redeemSuccessCheck
            })
          })
        }), (0, d.jsx)(b.default, {
          element: "h2", className: f.default.modalDepositTitle, children: "Gift Card Redeemed"
        }), (0, d.jsxs)(u.default, {
          element: "p", textType: "regular14", className: f.default.modalDepositOptionsLabel, children: [L.toLocaleString(), " ", V, " were added to your balance."]
        }), null !== I && n !== H && (0, d.jsxs)("div", {
          className: f.default.redeemCurrencySwitcher, children: [(0, d.jsx)("div", {
            className: f.default.redeemCurrencySwitcherHeader, children: (0, d.jsxs)(u.default, {
              element: "p", textType: "regular14", children: ["To play with the redeemed ", V, ", switch your playing currency below."]
            })
          }), (0, d.jsxs)("div", {
            className: f.default.redeemCurrencySwitcherRail, children: [(0, d.jsxs)("div", {
              className: f.default.redeemCurrencySwitcherCard, children: [(0, d.jsx)("span", {
                className: f.default.redeemCurrencySwitcherBadge, children: "Current"
              }), (0, d.jsxs)("div", {
                className: f.default.redeemCurrencySwitcherValue, children: [(0, d.jsx)($, {
                  width: 18, height: 18
                }), (0, d.jsx)("span", {
                  children: "ROCOINS" === n?"RoCoins": "FlipCoins"
                })]
              })]
            }), (0, d.jsx)("div", {
              className: f.default.redeemCurrencySwitcherArrow, "aria-hidden": "true", children: (0, d.jsx)("span", {

              })
            }), (0, d.jsxs)("div", {
              className: f.default.redeemCurrencySwitcherCard, children: [(0, d.jsx)("span", {
                className: f.default.redeemCurrencySwitcherBadge, children: "Credited"
              }), (0, d.jsxs)("div", {
                className: f.default.redeemCurrencySwitcherValue, children: [(0, d.jsx)(z, {
                  width: 18, height: 18
                }), (0, d.jsx)("span", {
                  children: V
                })]
              })]
            })]
          }), (0, d.jsxs)(i.default, {
            variant: "primary", className: f.default.paymentButton, onClick: () => e( {
              type: l.SET_CURRENCY, payload: H
            }), children: ["Play with ", V]
          })]
        }), (0, d.jsxs)("div", {
          className: f.default.redeemSuccessSummary, children: [(0, d.jsx)(u.default, {
            element: "p", textType: "regular14", children: "Redeemed amount"
          }), (0, d.jsxs)(b.default, {
            element: "h3", children: [L.toLocaleString(), " ", (0, d.jsx)(z, {
              width: 18, height: 18
            })]
          })]
        }), (0, d.jsx)("div", {
          className: f.default.redeemSuccessActions, children: (0, d.jsx)(i.default, {
            variant: "secondary", className: f.default.paymentButton, onClick: () => {
              O(null), D(null)
            }, children: "Back"
          })
        })]
      })
    }): (0, d.jsxs)("div", {
      className: f.default.stepContainer, children: [(0, d.jsx)(b.default, {
        element: "h2", className: f.default.modalDepositTitle, children: "Deposit via Credit Card"
      }), (0, d.jsx)("div", {
        className: f.default.modalDepositOptions, children: (0, d.jsx)(u.default, {
          element: "p", textType: "regular14", className: f.default.modalDepositOptionsLabel, children: "Enter a USD amount and complete your purchase on Lootkey."
        })
      }), (0, d.jsxs)("div", {
        className: f.default.amountContainer, children: [(0, d.jsx)("div", {
          className: f.default.inputWithButtons, children: (0, d.jsxs)("div", {
            className: f.default.usdInputWrapper, children: [(0, d.jsx)("span", {
              className: f.default.usdPrefix, children: "$"
            }), (0, d.jsx)(h.default, {
              type: "number", value: m, onChange: e => {
                let t = e.target.value; if("" === t) {
                  p(""), r(0); return
                }
                let d = Number(t); p(d), r(d)
              }, withIncrementDecrement: !0, onIncrement: () => {
                let e = q + 1; e <= 500 && W(e)
              }, onDecrement: () => {
                let e = q - 1; e >= 1 && W(e)
              }, disableDecrement: q <= 1, placeholder: "0"
            })]
          })
        }), (0, d.jsxs)("div", {
          className: f.default.previewSection, children: [(0, d.jsx)(u.default, {
            element: "p", textType: "regular14", children: "You will receive"
          }), (0, d.jsxs)(b.default, {
            element: "h3", children: [T.toLocaleString(), " ", (0, d.jsx)(S.default, {
              width: 18, height: 18
            })]
          })]
        }), P>0 && (0, d.jsxs)("div", {
          className: f.default.previewSection, children: [(0, d.jsx)(u.default, {
            element: "p", textType: "regular14", children: "Approx Value in Robux"
          }), (0, d.jsxs)(u.default, {
            element: "p", textType: "regular14", style: {
              color: "#fff", fontWeight: 600, fontSize: "14px"
            }, children: [P.toLocaleString(), " R$"]
          })]
        }), (0, d.jsx)("div", {
          className: f.default.predefinedAmounts, children: (0, d.jsx)(v, {
            options: g, selectedAmount: m, onAmountSelect: W
          })
        }), (0, d.jsxs)(i.default, {
          disabled: !B, variant: "primary", className: f.default.paymentButton, onClick: () => {
            if(!B)return; let e = `https://lootkey.gg/checkout?product=${k}&coins=${T}`; w.track("LOOTCODE_PURCHASE_CLICKED", {
              usdAmount: m, coins: T
            }), window.open(e, "_blank", "noopener,noreferrer")
          }, children: ["Purchase $", q, " on Lootkey"]
        })]
      }), (0, d.jsx)("div", {
        className: f.default.redeemDivider, children: (0, d.jsx)("span", {
          children: "Have a gift card code?"
        })
      }), (0, d.jsxs)("div", {
        className: f.default.redeemSection, children: [(0, d.jsx)("div", {
          className: f.default.redeemInputRow, children: (0, d.jsx)("div", {
            className: f.default.redeemInput, children: (0, d.jsx)(h.default, {
              placeholder: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", value: x, onChange: e => {
                let t; C([(t = e.target.value.replace(/[^0-9a-fA-F]/g, "").slice(0, 32)).slice(0, 8), t.slice(8, 12), t.slice(12, 16), t.slice(16, 20), t.slice(20, 32)].filter(Boolean).join("-"))
              }, disabled: y
            })
          })
        }), (0, d.jsx)(i.default, {
          disabled: !M, variant: "primary", className: f.default.paymentButton, onClick: F, children: y?"Redeeming...": "Redeem"
        })]
      })]
    })
  }, O = () => {
    let[e, t] = (0, s.useState)(!1), c = (0, a.useDispatch)(), u = (0, a.useSelector)(e => e.auth.showCardsModal); function m() {
      c( {
        type: l.HIDE_CARDS_DEPOSIT
      }), c( {
        type: l.SHOW_DEPOSIT
      }), t(!1), document.body.style.overflow = "initial"
    }
    return(0, s.useEffect)(() => {
      u?(t(!0), setTimeout(() => {
        document.body.style.overflow = "hidden"
      }, 0)): !1 === u && m()
    }, [u]), (0, d.jsxs)(n.default, {
      isOpen: e, onRequestClose: m, contentLabel: "Replenishment modal", className: (0, r.default)(o.default.defaultModal, o.default.modalDeposit, f.default.creditCardModalRoot), closeTimeoutMS: 200, children: [(0, d.jsxs)("div", {
        className: o.default.defaultModalBreadcrumbs, children: [(0, d.jsx)(i.default, {
          onClick: m, className: o.default.defaultModalBreadcrumbsItem, children: (0, d.jsx)("span", {
            children: "Wallet"
          })
        }), (0, d.jsx)(i.default, {
          onClick: m, className: o.default.defaultModalBreadcrumbsItem, children: (0, d.jsx)("span", {
            children: "Deposit"
          })
        }), (0, d.jsx)(i.default, {
          className: o.default.defaultModalBreadcrumbsItem, children: (0, d.jsx)("span", {
            children: "Credit Card"
          })
        })]
      }), (0, d.jsx)(L, {

      }), (0, d.jsx)(i.default, {
        onClick: m, className: o.default.defaultModalClose, "aria-label": "Close"
      })]
    })
  }; n.default.setAppElement("#__next"); let I = function() {
    return(0, d.jsx)(x, {
      children: (0, d.jsx)(O, {

      })
    })
  }; var D = e.i(901876), k = e.i(455550); n.default.setAppElement("#__next"); let q = (0, p.default)(() => e.A(2152), {
    loadableGenerated: {
      modules: [203165]
    }, ssr: !1
  }), T = (0, p.default)(() => e.A(832588), {
    loadableGenerated: {
      modules: [281445]
    }, ssr: !1
  }), B = (0, p.default)(() => e.A(907412), {
    loadableGenerated: {
      modules: [170281]
    }, ssr: !1
  }), A = (0, p.default)(() => e.A(690015), {
    loadableGenerated: {
      modules: [775439]
    }, ssr: !1
  }), P = (0, p.default)(() => e.A(632709), {
    loadableGenerated: {
      modules: [344473]
    }, ssr: !1
  }), W = () => (0, d.jsxs)("svg", {
    width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", "aria-hidden": !0, children: [(0, d.jsx)("path", {
      d: "M6 6l6 6-6 6", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round"
    }), (0, d.jsx)("path", {
      d: "M13 6l6 6-6 6", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round"
    })]
  }); function F( {
    direction: e
  }) {
    let[t, s] = "flip-to-ro" === e?[(0, d.jsx)(S.default, {
      viewBox: "0 0 17 19", width: 26, height: 26
    }, "from"), (0, d.jsx)(N.default, {
      viewBox: "0 0 18 19", width: 26, height: 26
    }, "to")]: [(0, d.jsx)(N.default, {
      viewBox: "0 0 18 19", width: 26, height: 26
    }, "from"), (0, d.jsx)(S.default, {
      viewBox: "0 0 17 19", width: 26, height: 26
    }, "to")]; return(0, d.jsxs)(d.Fragment, {
      children: [t, (0, d.jsx)("span", {
        className: o.default.transferArrow, children: (0, d.jsx)(W, {

        })
      }), s]
    })
  }
  function M( {
    method: e, label: t, receiveCurrency: s, disabled: a, disabledTooltip: l, className: i, badge: n, onClick: m
  }) {
    let p = n?.kind === "discount"?o.default.discount: n?.kind === "locked"?o.default.locked: n?.kind === "transfer"?o.default.transferTag: "", _ = "transfer-flip-to-ro" === s?"flip-to-ro": "transfer-ro-to-flip" === s?"ro-to-flip": null; return(0, d.jsxs)("button", {
      type: "button", className: (0, r.default)(o.default.method, i, a && o.default.disabled), onClick: () => {
        if(a) {
          l && (0, c.toast)(l); return
        }
        m(e)
      }, "aria-disabled": a, children: [(0, d.jsx)(u.default, {
        textType: "regular16", element: "p", className: o.default.methodName, children: t
      }), n && (0, d.jsxs)("span", {
        className: (0, r.default)(o.default.methodBadge, p), children: [n.icon, n.text]
      }), (0, d.jsx)("div", {
        className: (0, r.default)(o.default.methodArt, o.default[e]), children: _ && (0, d.jsx)(F, {
          direction: _
        })
      })]
    })
  }
  let H = (0, a.connect)(e => ( {
    showDeposit: e.auth.showDeposit, user: e.auth.user, discounts: e.auth.discounts
  }))(function( {
    showDeposit: e, discounts: t
  }) {
    let c = (0, a.useDispatch)(), [p, _] = (0, s.useState)(!1), [x, f] = (0, s.useState)(null), h = (0, D.useAppSelector)(e => e.auth.geoBlock), C = (0, D.useAppSelector)(e => e.auth.fflags), y = (0, s.useMemo)(() => (0, k.parseDepositPromosFlag)(C), [C]), j = (0, s.useMemo)(() => (0, m.getGapWidth)("margin"), []); function v() {
      c( {
        type: l.HIDE_DEPOSIT
      }), _(!1), f(null), document.body.style.overflow = "initial", document.body.style.paddingRight = "0px"
    }
    (0, s.useEffect)(() => {
      if(e) {
        try {
          if(!localStorage.getItem("currencyWizardCompleted"))return void c( {
            type: l.SHOW_CURRENCY_WIZARD
          })
        }catch {

        }
        _(!0), setTimeout(() => {
          document.body.style.overflow = "hidden", document.body.style.paddingRight = j.gap + "px"
        }, 0)
      }else v()
    }, [e]); let b = e => !!t && e in t && !!t[e], w = t?.CREDIT_CARD?.percentOff ?? 0, E = t?.CRYPTO?.percentOff ?? 0, R = e => {
      let t = "ro" === x?"ROCOINS": "FLIPCOINS"; "cards" === e?c( {
        type: l.SHOW_CARDS_DEPOSIT, payload: {
          walletCurrency: t
        }
      }): "crypto" === e?c( {
        type: l.SHOW_CRYPTO_DEPOSIT, payload: {
          walletCurrency: t
        }
      }): "robux" === e?c( {
        type: l.SHOW_ROBUX_DEPOSIT
      }): "promo" === e?c( {
        type: l.SHOW_PROMO_DEPOSIT
      }): "depositPromos" === e?c( {
        type: l.SHOW_DEPOSIT_PROMOS
      }): "transfer" === e && c( {
        type: l.SHOW_TRANSFER, payload: {
          depositCurrency: x, direction: "flip-to-ro"
        }
      })
    }; return(0, d.jsxs)(d.Fragment, {
      children: [(0, d.jsx)(q, {

      }), (0, d.jsx)(T, {

      }), (0, d.jsx)(I, {

      }), (0, d.jsx)(B, {

      }), (0, d.jsx)(P, {

      }), (0, d.jsx)(A, {

      }), (0, d.jsxs)(n.default, {
        isOpen: p, onRequestClose: v, contentLabel: "Replenishment modal", className: (0, r.default)(o.default.depositRedesign, null === x && o.default.depositRedesignStep1), closeTimeoutMS: 200, children: [(0, d.jsx)(i.default, {
          onClick: v, className: o.default.defaultModalClose, "aria-label": "Close"
        }), null === x?(0, d.jsxs)(d.Fragment, {
          children: [(0, d.jsx)("div", {
            className: o.default.depositTitleRow, children: (0, d.jsx)("h2", {
              className: o.default.depositTitle, children: "Deposit"
            })
          }), (0, d.jsx)("p", {
            className: (0, r.default)(o.default.depositSub, o.default.depositSubRow), children: "Pick which balance to top up. They live in separate wallets and can't be used interchangeably."
          }), (0, d.jsxs)("div", {
            className: o.default.depositDifferenceRow, children: [(0, d.jsx)("button", {
              type: "button", className: o.default.depositLink, onClick: () => c( {
                type: l.SHOW_CURRENCY_WIZARD
              }), children: "What's the difference?"
            }), (0, d.jsx)("button", {
              type: "button", className: o.default.depositLinkMobile, onClick: () => c( {
                type: l.SHOW_CURRENCY_WIZARD
              }), children: "What's the difference?"
            })]
          }), (0, d.jsxs)("div", {
            className: o.default.ccyGrid, children: [(0, d.jsxs)("button", {
              type: "button", className: (0, r.default)(o.default.ccyTile, o.default.flip), onClick: () => f("flip"), disabled: h, children: [(0, d.jsx)("div", {
                className: o.default.ccyHead, children: (0, d.jsx)("div", {
                  className: o.default.ccyIcon, children: (0, d.jsx)(S.default, {
                    viewBox: "0 0 17 19"
                  })
                })
              }), (0, d.jsx)("h3", {
                className: o.default.ccyTitle, children: "FlipCoins"
              }), (0, d.jsx)("p", {
                className: o.default.ccyDesc, children: "Cash out to Crypto"
              })]
            }), (0, d.jsxs)("button", {
              type: "button", className: (0, r.default)(o.default.ccyTile, o.default.ro), onClick: () => f("ro"), children: [(0, d.jsx)("div", {
                className: o.default.ccyHead, children: (0, d.jsx)("div", {
                  className: o.default.ccyIcon, children: (0, d.jsx)(N.default, {
                    viewBox: "0 0 18 19"
                  })
                })
              }), (0, d.jsx)("h3", {
                className: o.default.ccyTitle, children: "RoCoins"
              }), (0, d.jsx)("p", {
                className: o.default.ccyDesc, children: "Cash out to Robux"
              })]
            }), y.enabled && (0, d.jsx)(M, {
              method: "depositPromos", label: y.title, receiveCurrency: "flip", className: o.default.depositEntryBonusTile, disabled: h, onClick: R
            }), (0, d.jsx)(M, {
              method: "promo", label: "Promo code", receiveCurrency: "flip", className: o.default.depositEntryPromoTile, disabled: h, onClick: R
            })]
          })]
        }): (0, d.jsxs)(d.Fragment, {
          children: [(0, d.jsxs)("div", {
            className: (0, r.default)(o.default.defaultModalBreadcrumbs, o.default.depositFlowBreadcrumbs), children: [(0, d.jsx)(i.default, {
              className: o.default.defaultModalBreadcrumbsItem, onClick: () => f(null), children: (0, d.jsx)(u.default, {
                element: "span", textType: "labelsRegular", children: "Deposit"
              })
            }), (0, d.jsx)(i.default, {
              className: o.default.defaultModalBreadcrumbsItem, children: (0, d.jsx)(u.default, {
                element: "span", textType: "labelsRegular", children: "flip" === x?"Buy FlipCoins": "Buy RoCoins"
              })
            })]
          }), (0, d.jsxs)("div", {
            className: (0, r.default)(o.default.stepHead, o.default[x]), children: [(0, d.jsx)("div", {
              className: o.default.ccyGlyph, children: "flip" === x?(0, d.jsx)(S.default, {
                viewBox: "0 0 17 19"
              }): (0, d.jsx)(N.default, {
                viewBox: "0 0 18 19"
              })
            }), (0, d.jsx)("div", {
              className: o.default.stepHeadBody, children: (0, d.jsx)("h2", {
                children: "flip" === x?"Buy FlipCoins": "Buy RoCoins"
              })
            }), (0, d.jsx)(i.default, {
              type: "button", variant: "primary", className: o.default.switchButton, onClick: () => f("flip" === x?"ro": "flip"), children: "flip" === x?(0, d.jsxs)(d.Fragment, {
                children: [(0, d.jsx)(N.default, {
                  viewBox: "0 0 18 19", style: {
                    width: 14, height: 14
                  }
                }), "Buy RoCoins instead"]
              }): (0, d.jsxs)(d.Fragment, {
                children: [(0, d.jsx)(S.default, {
                  viewBox: "0 0 17 19", style: {
                    width: 14, height: 14
                  }
                }), "Buy FlipCoins instead"]
              })
            })]
          }), (0, d.jsx)("div", {
            className: o.default.methodGrid, children: "flip" === x?(0, d.jsxs)(d.Fragment, {
              children: [(0, d.jsx)(M, {
                method: "cards", label: b("CREDIT_CARD")?"Cards": "Credit Card", receiveCurrency: "flip", badge: b("CREDIT_CARD")? {
                  kind: "discount", text: `${w}% off`
                }
                : void 0, onClick: R
              }), (0, d.jsx)(M, {
                method: "crypto", label: "Crypto", receiveCurrency: "flip", badge: b("CRYPTO")? {
                  kind: "discount", text: `${E}% off`
                }
                : void 0, onClick: R
              }), (0, d.jsx)(M, {
                method: "robux", label: "Robux", receiveCurrency: "ro", disabled: !0, disabledTooltip: "Robux deposits credit your RoCoin balance. Switch to RoCoins to use this method.", onClick: R
              }), (0, d.jsx)(M, {
                method: "transfer", label: "Swap For RoCoins", receiveCurrency: "transfer-flip-to-ro", onClick: R
              })]
            }): (0, d.jsxs)(d.Fragment, {
              children: [(0, d.jsx)(M, {
                method: "robux", label: "Robux", receiveCurrency: "ro", onClick: R
              }), (0, d.jsx)(M, {
                method: "cards", label: b("CREDIT_CARD")?"Cards": "Credit Card", receiveCurrency: "ro", badge: b("CREDIT_CARD")? {
                  kind: "discount", text: `${w}% off`
                }
                : void 0, onClick: R
              }), (0, d.jsx)(M, {
                method: "crypto", label: "Crypto", receiveCurrency: "ro", badge: b("CRYPTO")? {
                  kind: "discount", text: `${E}% off`
                }
                : void 0, onClick: R
              }), (0, d.jsx)(M, {
                method: "transfer", label: "From FlipCoins", receiveCurrency: "transfer-flip-to-ro", onClick: R
              })]
            })
          })]
        })]
      })]
    })
  }); e.s(["default", 0, H], 147155)
}, 256815, e => {
  e.n(e.i(147155))
}, 2152, e => {
  e.v(t => Promise.all(["static/chunks/52721f8df41b876c.js"].map(t => e.l(t))).then(() => t(203165)))
}, 832588, e => {
  e.v(t => Promise.all(["static/chunks/9df4f2a3a88be6af.js", "static/chunks/ecac5cf436c86038.js"].map(t => e.l(t))).then(() => t(281445)))
}, 907412, e => {
  e.v(t => Promise.all(["static/chunks/1745089127f9fc4c.js"].map(t => e.l(t))).then(() => t(170281)))
}, 690015, e => {
  e.v(t => Promise.all(["static/chunks/cddfb6ab7c381a8a.js"].map(t => e.l(t))).then(() => t(775439)))
}, 632709, e => {
  e.v(t => Promise.all(["static/chunks/31767fc08591e63b.css", "static/chunks/2a5e439f5fc5bd10.js"].map(t => e.l(t))).then(() => t(344473)))
}]);