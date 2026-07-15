(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document?document.currentScript: void 0, 764492, e => {
  e.v( {
    authLinkButton: "Profile-module-scss-module__yWarhq__authLinkButton", authLinkControl: "Profile-module-scss-module__yWarhq__authLinkControl", authLinkDetail: "Profile-module-scss-module__yWarhq__authLinkDetail", authLinkIcon: "Profile-module-scss-module__yWarhq__authLinkIcon", authLinkIconDiscord: "Profile-module-scss-module__yWarhq__authLinkIconDiscord", authLinkIconEmail: "Profile-module-scss-module__yWarhq__authLinkIconEmail", authLinkMeta: "Profile-module-scss-module__yWarhq__authLinkMeta", authLinkPrivateValue: "Profile-module-scss-module__yWarhq__authLinkPrivateValue", authLinkPrivateValueHidden: "Profile-module-scss-module__yWarhq__authLinkPrivateValueHidden", authLinkProvider: "Profile-module-scss-module__yWarhq__authLinkProvider", authLinkRow: "Profile-module-scss-module__yWarhq__authLinkRow", authLinkTitle: "Profile-module-scss-module__yWarhq__authLinkTitle", authLinkTitleLine: "Profile-module-scss-module__yWarhq__authLinkTitleLine", authLinksIntro: "Profile-module-scss-module__yWarhq__authLinksIntro", authLinksList: "Profile-module-scss-module__yWarhq__authLinksList", authLinksSection: "Profile-module-scss-module__yWarhq__authLinksSection", changeUsernameForm: "Profile-module-scss-module__yWarhq__changeUsernameForm", changeUsernameSection: "Profile-module-scss-module__yWarhq__changeUsernameSection", devider: "Profile-module-scss-module__yWarhq__devider", emailLinkForm: "Profile-module-scss-module__yWarhq__emailLinkForm", identityContent: "Profile-module-scss-module__yWarhq__identityContent", identityLabel: "Profile-module-scss-module__yWarhq__identityLabel", identityOption: "Profile-module-scss-module__yWarhq__identityOption", identityOptionActive: "Profile-module-scss-module__yWarhq__identityOptionActive", identityOptionDisabled: "Profile-module-scss-module__yWarhq__identityOptionDisabled", identityOptionUnavailable: "Profile-module-scss-module__yWarhq__identityOptionUnavailable", identityOptions: "Profile-module-scss-module__yWarhq__identityOptions", identityRadio: "Profile-module-scss-module__yWarhq__identityRadio", identityRadioInner: "Profile-module-scss-module__yWarhq__identityRadioInner", identitySubtext: "Profile-module-scss-module__yWarhq__identitySubtext", profile: "Profile-module-scss-module__yWarhq__profile", profileMain: "Profile-module-scss-module__yWarhq__profileMain", profileMainBlock: "Profile-module-scss-module__yWarhq__profileMainBlock", profileMainBlockContent: "Profile-module-scss-module__yWarhq__profileMainBlockContent", profileMainBlockDescription: "Profile-module-scss-module__yWarhq__profileMainBlockDescription", profileMainBlockTitle: "Profile-module-scss-module__yWarhq__profileMainBlockTitle", profileMainBlocks: "Profile-module-scss-module__yWarhq__profileMainBlocks", profileMainButton: "Profile-module-scss-module__yWarhq__profileMainButton", profileMainNextUpdate: "Profile-module-scss-module__yWarhq__profileMainNextUpdate", profileMainSwitcher: "Profile-module-scss-module__yWarhq__profileMainSwitcher", profileMainUser: "Profile-module-scss-module__yWarhq__profileMainUser", profileMainUserAvatar: "Profile-module-scss-module__yWarhq__profileMainUserAvatar", profileMainUserText: "Profile-module-scss-module__yWarhq__profileMainUserText", profileMainUserTextUID: "Profile-module-scss-module__yWarhq__profileMainUserTextUID", profileStatsTabs: "Profile-module-scss-module__yWarhq__profileStatsTabs", provablyFairField: "Profile-module-scss-module__yWarhq__provablyFairField", provablyFairLabel: "Profile-module-scss-module__yWarhq__provablyFairLabel", provablyFairSection: "Profile-module-scss-module__yWarhq__provablyFairSection", settingsContent: "Profile-module-scss-module__yWarhq__settingsContent", settingsNavItem: "Profile-module-scss-module__yWarhq__settingsNavItem", settingsNavItemActive: "Profile-module-scss-module__yWarhq__settingsNavItemActive", settingsSection: "Profile-module-scss-module__yWarhq__settingsSection", settingsSidebar: "Profile-module-scss-module__yWarhq__settingsSidebar", xpSwapPreviewBox: "Profile-module-scss-module__yWarhq__xpSwapPreviewBox", xpSwapPreviewLabel: "Profile-module-scss-module__yWarhq__xpSwapPreviewLabel", xpSwapPreviewValue: "Profile-module-scss-module__yWarhq__xpSwapPreviewValue", xpSwapRateLabel: "Profile-module-scss-module__yWarhq__xpSwapRateLabel", xpSwapSection: "Profile-module-scss-module__yWarhq__xpSwapSection"
  })
}, 727677, e => {
  "use strict"; var t = e.i(478902), a = e.i(389959), s = e.i(692742), l = e.i(416511), i = e.i(455675), n = e.i(278287); e.i(802398); var r = e.i(565252), d = e.i(177044), o = e.i(94751), c = e.i(498101), u = e.i(383312), f = e.i(372045), m = e.i(907153), h = e.i(474861), p = e.i(33892), x = e.i(75730), y = e.i(965783), g = e.i(764492), b = e.i(187742), j = e.i(56040), v = e.i(704884), N = e.i(507689), T = e.i(900960), _ = e.i(944967), w = e.i(977331), k = e.i(263203), S = e.i(376339), C = e.i(349792); let P = [ {
    value: "games", label: "Games"
  }, {
    value: "rain", label: "Rain"
  }, {
    value: "affiliate_earnings", label: "Affiliate Earnings"
  }, {
    value: "gifts", label: "Gifts"
  }, {
    value: "rakeback", label: "Rakeback"
  }, {
    value: "support_adjustments", label: "Balance Adjustments"
  }]; function I(e) {
    return(0, v.default)((0, N.default)(Math.abs(e)))
  }
  function L( {
    user: e, isAuthenticated: l, className: i, ...n
  }) {
    let[r, d] = (0, a.useState)(1), [o, c] = (0, a.useState)(0), [u, h] = (0, a.useState)("games"), [p, x] = (0, a.useState)([]), [y, g] = (0, a.useState)(!1), v = (0, b.default)(), [N, k] = (0, a.useState)(!1); (0, a.useEffect)(() => {
      k(!0)
    }, []); let S = N && v.width<768, {
      items: I
    }
    = (0, C.default)( {
      count: o, page: r, onChange: (e, t) => {
        d(t)
      }
    }); return(0, a.useEffect)(() => {
      l && (async() => {
        g(!0); try {
          let e = await (0, j.getWalletHistory)(r - 1, 6, u); x(e.data || []), c(e.totalPages || 0)
        }catch(e) {
          s.toast.error("Failed to load transactions, please refresh the page and try again!")
        }finally {
          g(!1)
        }
      })()
    }, [r, u, l]), (0, t.jsxs)("div", {
      className: (0, _.default)(w.default.statistics, w.default.profileStatistics, i), ...n, children: [(0, t.jsxs)("div", {
        className: w.default.statisticsHeader, children: [(0, t.jsx)(f.default, {
          element: "p", textType: "smHeadlines", className: w.default.statisticsHeaderTitle, children: "Transactions"
        }), (0, t.jsx)("select", {
          value: u, onChange: e => {
            h(e.target.value), d(1), x([])
          }, className: w.default.statisticsDropdown, children: P.map(e => (0, t.jsx)("option", {
            value: e.value, children: e.label
          }, e.value))
        })]
      }), S?(0, t.jsxs)("div", {
        className: w.default.cardList, children: [p.length>0 && p.map((e, a) => (0, t.jsx)(E, {
          entry: e, view: u
        }, a)), !y && 0 === p.length && (0, t.jsx)("div", {
          className: w.default.cardEmpty, children: (0, t.jsx)(f.default, {
            element: "p", textType: "regular14", children: "No transactions found"
          })
        })]
      }): (0, t.jsxs)("table", {
        className: w.default.statisticsTable, children: [(0, t.jsx)("thead", {
          className: w.default.statisticsTableHead, children: (0, t.jsx)("tr", {
            className: w.default.statisticsTableRow, children: function(e) {
              switch(e) {
                case"deposits": return(0, t.jsxs)(t.Fragment, {
                  children: [(0, t.jsx)(A, {
                    children: "ID"
                  }), (0, t.jsx)(A, {
                    children: "Payment Method"
                  }), (0, t.jsx)(A, {
                    children: "Date and time"
                  }), (0, t.jsx)(A, {
                    children: "Amount"
                  })]
                }); case"withdrawals": return(0, t.jsxs)(t.Fragment, {
                  children: [(0, t.jsx)(A, {
                    children: "ID"
                  }), (0, t.jsx)(A, {
                    children: "Item"
                  }), (0, t.jsx)(A, {
                    children: "Game"
                  }), (0, t.jsx)(A, {
                    children: "Date and time"
                  }), (0, t.jsx)(A, {
                    children: "Amount"
                  })]
                }); case"robux_purchases": return(0, t.jsxs)(t.Fragment, {
                  children: [(0, t.jsx)(A, {
                    children: "Status"
                  }), (0, t.jsx)(A, {
                    children: "Robux"
                  }), (0, t.jsx)(A, {
                    children: "Coins"
                  }), (0, t.jsx)(A, {
                    children: "Progress"
                  }), (0, t.jsx)(A, {
                    children: "Date"
                  }), (0, t.jsx)(A, {
                    children: "Action"
                  })]
                }); case"gifts": return(0, t.jsxs)(t.Fragment, {
                  children: [(0, t.jsx)(A, {
                    children: "ID"
                  }), (0, t.jsx)(A, {
                    children: "Description"
                  }), (0, t.jsx)(A, {
                    children: "User"
                  }), (0, t.jsx)(A, {
                    children: "Date and time"
                  }), (0, t.jsx)(A, {
                    children: "Amount"
                  })]
                }); default: return(0, t.jsxs)(t.Fragment, {
                  children: [(0, t.jsx)(A, {
                    children: "ID"
                  }), (0, t.jsx)(A, {
                    children: "Description"
                  }), (0, t.jsx)(A, {
                    children: "Date and time"
                  }), (0, t.jsx)(A, {
                    children: "Amount"
                  })]
                })
              }
            }
            (u)
          })
        }), (0, t.jsx)("tbody", {
          className: w.default.statisticsTableBody, children: (0, t.jsxs)(t.Fragment, {
            children: [p.length>0 && p.map((e, a) => (0, t.jsx)("tr", {
              className: w.default.statisticsTableRow, children: function(e, a) {
                switch(a) {
                  case"deposits": return(0, t.jsxs)(t.Fragment, {
                    children: [(0, t.jsx)(D, {
                      id: e.id
                    }), (0, t.jsx)(M, {
                      highlighted: !0, children: e.paymentMethod
                    }), (0, t.jsx)(M, {
                      children: (0, T.epochToString)(e.timestamp)
                    }), (0, t.jsx)(F, {
                      amount: e.amount, currency: e.currency || ""
                    })]
                  }); case"withdrawals": return(0, t.jsxs)(t.Fragment, {
                    children: [(0, t.jsx)(D, {
                      id: e.id
                    }), (0, t.jsx)(M, {
                      highlighted: !0, children: e.itemName
                    }), (0, t.jsx)(M, {
                      children: e.game
                    }), (0, t.jsx)(M, {
                      children: (0, T.epochToString)(e.timestamp)
                    }), (0, t.jsx)(F, {
                      amount: -e.amount, currency: e.currency || ""
                    })]
                  }); case"robux_purchases": return(0, t.jsx)(U, {
                    entry: e
                  }); case"gifts": return(0, t.jsxs)(t.Fragment, {
                    children: [(0, t.jsx)(D, {
                      id: e.id
                    }), (0, t.jsx)(M, {
                      highlighted: !0, children: e.title
                    }), (0, t.jsx)(M, {
                      children: e.counterparty
                    }), (0, t.jsx)(M, {
                      children: (0, T.epochToString)(e.timestamp)
                    }), (0, t.jsx)(F, {
                      amount: e.amount, currency: e.currency || ""
                    })]
                  }); case"games": {
                    let a = e.title || (e.type?`Pack Battle ${e.type}`: "Game"), s = e.battleId?"/case-battles/"+e.battleId: null; return(0, t.jsxs)(t.Fragment, {
                      children: [(0, t.jsx)(D, {
                        id: e.id
                      }), (0, t.jsx)(M, {
                        highlighted: !0, style: s? {
                          cursor: "pointer", color: "#fcb122"
                        }
                        : void 0, onClick: () => {
                          s && window.open(s, "_blank")
                        }, children: a
                      }), (0, t.jsx)(M, {
                        children: (0, T.epochToString)(e.timestamp)
                      }), (0, t.jsx)(F, {
                        amount: e.amount, currency: e.currency
                      })]
                    })
                  }
                  default: return(0, t.jsxs)(t.Fragment, {
                    children: [(0, t.jsx)(D, {
                      id: e.id
                    }), (0, t.jsx)(M, {
                      highlighted: !0, children: e.title
                    }), (0, t.jsx)(M, {
                      children: (0, T.epochToString)(e.timestamp)
                    }), (0, t.jsx)(F, {
                      amount: e.amount, currency: e.currency || ""
                    })]
                  })
                }
              }
              (e, u)
            }, a)), !y && 0 === p.length && (0, t.jsx)("tr", {
              className: w.default.statisticsTableRow, children: (0, t.jsx)("td", {
                className: w.default.statisticsTableItem, colSpan: 5, children: (0, t.jsx)(f.default, {
                  element: "p", textType: "regular14", style: {
                    textAlign: "center", padding: "24px 0"
                  }, children: "No transactions found"
                })
              })
            }), (0, t.jsx)("div", {
              style: {
                height: `${58*Math.max(0,6-p.length)}px`
              }
            })]
          })
        })]
      }), (0, t.jsx)("div", {
        className: w.default.statisticsPagination, children: I.map(( {
          page: e, type: a, selected: s, ...l
        }, i) => {
          let n = null; if("start-ellipsis" === a || "end-ellipsis" === a)n = (0, t.jsxs)(m.default, {
            variant: "pagination", disabled: !0, children: [e, "..."]
          }); else if("page" === a)n = (0, t.jsx)(m.default, {
            variant: "pagination", isActive: s, ...l, children: e
          }); else {
            let e = a; "previous" === e && (e = "prev"), n = (0, t.jsx)(m.default, {
              variant: "default", className: w.default.statisticsPaginationLast, ...l, children: e
            })
          }
          return[n]
        })
      })]
    })
  }
  function E( {
    entry: e, view: a
  }) {
    if("robux_purchases" === a)return(0, t.jsx)(R, {
      entry: e
    }); let l = "", i = "", n = 0, r = null; switch(a) {
      case"deposits": l = e.paymentMethod || "Deposit", n = e.amount; break; case"withdrawals": l = e.itemName || "Withdrawal", i = e.game || "", n = -e.amount; break; case"gifts": l = e.title || "Gift", i = e.counterparty?"Gift Sent" === e.title?`To: ${e.counterparty}`: `From: ${e.counterparty}`: "", n = e.amount; break; case"games": l = e.title || (e.type?`Pack Battle ${e.type}`: "Game"), n = e.amount, e.battleId && (r = "/case-battles/"+e.battleId); break; default: l = e.title || a, n = e.amount
    }
    return(0, t.jsxs)("div", {
      className: w.default.card, children: [(0, t.jsxs)("div", {
        className: w.default.cardTop, children: [(0, t.jsx)(f.default, {
          element: "p", textType: "semibold14", className: w.default.cardLabel, style: r? {
            cursor: "pointer", color: "#fcb122"
          }
          : void 0, onClick: () => {
            r && window.open(r, "_blank")
          }, children: l
        }), (0, t.jsxs)(f.default, {
          element: "p", textType: "semibold14", className: w.default.cardAmount, style: n<0? {
            color: "rgba(255,255,255,0.4)"
          }
          : n>0? {
            color: "#05d3dd"
          }
          : {

          }, children: [n>0 && "+ ", n<0 && "- ", I(n), "ROCOINS" === e.currency?(0, t.jsx)(S.default, {

          }): (0, t.jsx)(k.default, {

          })]
        })]
      }), (0, t.jsxs)("div", {
        className: w.default.cardBottom, children: [e.id && (0, t.jsxs)(f.default, {
          element: "span", textType: "regular14", className: (0, _.default)(w.default.cardDetail, w.default.cardIdCopy), onClick: t => {
            t.stopPropagation(), navigator.clipboard.writeText(e.id), s.toast.success("ID copied to clipboard")
          }, children: [e.id.substring(0, 8), "..."]
        }), !e.id && i && (0, t.jsx)(f.default, {
          element: "span", textType: "regular14", className: w.default.cardDetail, children: i
        }), (0, t.jsx)(f.default, {
          element: "span", textType: "regular14", className: w.default.cardDate, children: (0, T.epochToString)(e.timestamp)
        })]
      })]
    })
  }
  function R( {
    entry: e
  }) {
    let[l, i] = (0, a.useState)(!1), [n, r] = (0, a.useState)(!1), d = async() => {
      if(!l && !n) {
        i(!0); try {
          await (0, j.cancelRobuxWithdrawal)(e.orderId), r(!0), s.toast.success("Withdrawal cancelled successfully")
        }catch(e) {
          s.toast.error(e?.response?.data?.error || "Failed to cancel withdrawal")
        }finally {
          i(!1)
        }
      }
    }, o = "PROCESSING" === e.status && !n; return(0, t.jsxs)("div", {
      className: w.default.card, children: [(0, t.jsxs)("div", {
        className: w.default.cardTop, children: [(0, t.jsxs)("div", {
          className: w.default.cardTopLeft, children: [(0, t.jsxs)(f.default, {
            element: "p", textType: "semibold14", className: w.default.cardLabel, children: [(0, v.default)(e.robuxAmount), " R$"]
          }), (0, t.jsxs)(f.default, {
            element: "p", textType: "regular14", className: w.default.cardDetail, children: [I(e.amount), " coins"]
          })]
        }), (0, t.jsx)(q, {
          status: n?"CANCELLED": e.status
        })]
      }), (0, t.jsx)("div", {
        className: w.default.cardProgressRow, children: (0, t.jsx)(W, {
          progress: e.progress
        })
      }), (0, t.jsxs)("div", {
        className: w.default.cardBottom, children: [(0, t.jsx)(f.default, {
          element: "span", textType: "regular14", className: w.default.cardDate, children: (0, T.epochToString)(e.timestamp)
        }), o && (0, t.jsx)(m.default, {
          variant: "secondary", onClick: d, disabled: l, className: w.default.cancelButtonMobile, children: l?"Cancelling...": "Cancel"
        })]
      })]
    })
  }
  function A( {
    children: e
  }) {
    return(0, t.jsx)("td", {
      className: w.default.statisticsTableItem, children: (0, t.jsx)(f.default, {
        element: "p", textType: "regular14", children: e
      })
    })
  }
  function D( {
    id: e
  }) {
    return(0, t.jsx)("td", {
      className: (0, _.default)(w.default.statisticsTableItem, w.default.statisticsTableItemHighlighted, w.default.statisticsTableItemID), children: (0, t.jsx)(f.default, {
        element: "p", textType: "semibold14", onClick: () => {
          e && (navigator.clipboard.writeText(e), s.toast.success("ID copied to clipboard"))
        }, children: e?e.substring(0, 8): "-"
      })
    })
  }
  function F( {
    amount: e, currency: a
  }) {
    return(0, t.jsx)("td", {
      className: (0, _.default)(w.default.statisticsTableItem, w.default.statisticsTableItemAmount), children: (0, t.jsxs)(f.default, {
        element: "p", textType: "semibold14", style: e<0? {
          color: "rgba(255,255,255,0.4)"
        }
        : e>0? {
          color: "#05d3dd"
        }
        : {

        }, children: [e>0 && "+ ", e<0 && "- ", I(e), "ROCOINS" === a?(0, t.jsx)(S.default, {

        }): (0, t.jsx)(k.default, {

        })]
      })
    })
  }
  function M( {
    children: e, highlighted: a, ...s
  }) {
    return(0, t.jsx)("td", {
      className: (0, _.default)(w.default.statisticsTableItem, a && w.default.statisticsTableItemHighlighted), ...s, children: (0, t.jsx)(f.default, {
        element: "p", textType: a?"semibold14": "regular14", children: e
      })
    })
  }
  function q( {
    status: e
  }) {
    return(0, t.jsx)("span", {
      className: w.default.statusBadge, style: {
        color: {
          PROCESSING: "#fcb122", COMPLETED: "#05d3dd", FAILED: "#ff4757", CANCELLED: "#5f6892", FINALIZING: "#a855f7"
        }
        [e] || "#fff"
      }, children: e
    })
  }
  function W( {
    progress: e
  }) {
    let a = Math.min(100, Math.max(0, 100*e)); return(0, t.jsxs)("div", {
      className: w.default.progressBarContainer, children: [(0, t.jsx)("div", {
        className: w.default.progressBarFill, style: {
          width: `${a}%`
        }
      }), (0, t.jsxs)("span", {
        className: w.default.progressBarText, children: [a.toFixed(0), "%"]
      })]
    })
  }
  function U( {
    entry: e
  }) {
    let[l, i] = (0, a.useState)(!1), [n, r] = (0, a.useState)(!1), d = async() => {
      if(!l && !n) {
        i(!0); try {
          await (0, j.cancelRobuxWithdrawal)(e.orderId), r(!0), s.toast.success("Withdrawal cancelled successfully")
        }catch(e) {
          s.toast.error(e?.response?.data?.error || "Failed to cancel withdrawal")
        }finally {
          i(!1)
        }
      }
    }, o = "PROCESSING" === e.status && !n; return(0, t.jsxs)(t.Fragment, {
      children: [(0, t.jsx)("td", {
        className: w.default.statisticsTableItem, children: (0, t.jsx)(q, {
          status: n?"CANCELLED": e.status
        })
      }), (0, t.jsx)("td", {
        className: (0, _.default)(w.default.statisticsTableItem, w.default.statisticsTableItemHighlighted), children: (0, t.jsxs)(f.default, {
          element: "p", textType: "semibold14", children: [(0, v.default)(e.robuxAmount), " R$"]
        })
      }), (0, t.jsx)("td", {
        className: w.default.statisticsTableItem, children: (0, t.jsxs)(f.default, {
          element: "p", textType: "regular14", className: w.default.cardAmount, children: [I(e.amount), (0, t.jsx)(k.default, {

          })]
        })
      }), (0, t.jsx)("td", {
        className: w.default.statisticsTableItem, children: (0, t.jsxs)(f.default, {
          element: "p", textType: "regular14", children: [e.progress, "%"]
        })
      }), (0, t.jsx)("td", {
        className: w.default.statisticsTableItem, children: (0, t.jsx)(f.default, {
          element: "p", textType: "regular14", children: (0, T.epochToString)(e.timestamp)
        })
      }), (0, t.jsx)("td", {
        className: w.default.statisticsTableItem, children: o?(0, t.jsx)(m.default, {
          variant: "secondary", onClick: d, disabled: l, className: w.default.cancelButton, children: l?"Cancelling...": "Cancel"
        }): (0, t.jsx)(f.default, {
          element: "p", textType: "regular14", style: {
            color: "#5f6892"
          }, children: "-"
        })
      })]
    })
  }
  let B = [ {
    value: "CRYPTO", label: "Crypto"
  }, {
    value: "ROBUX", label: "Robux"
  }, {
    value: "CREDIT_CARD", label: "Card"
  }, {
    value: "GIFT_CARD", label: "Gift Card"
  }], O = [ {
    value: "CRYPTO", label: "Crypto"
  }, {
    value: "ROBUX", label: "Robux"
  }, {
    value: "GIFT_CARD", label: "Gift Card"
  }, {
    value: "LIMITED", label: "Limiteds"
  }]; function $(e) {
    return(0, v.default)((0, N.default)(Math.abs(e)))
  }
  function H(e) {
    return e.statusChanges && e.statusChanges.length>0?e.statusChanges[e.statusChanges.length - 1].status: "Unknown"
  }
  function G(e) {
    return"COMPLETED" === e?"#05d3dd": "FAILED" === e || "CANCELLED" === e?"#ff4444": "PROCESSING" === e || "FINALIZING" === e?"#fcb122": void 0
  }
  function V( {
    entry: e
  }) {
    let a = e.trackingInfo?.robuxProgressed, s = e.trackingInfo?.robuxTotal; if(null == a || null == s || 0 === s)return null; let l = Math.min(100, Math.round(a/s*100)); return(0, t.jsxs)("div", {
      className: w.default.progressBarWrapper, children: [(0, t.jsx)("div", {
        className: w.default.progressTrack, children: (0, t.jsx)("div", {
          className: w.default.progressFill, style: {
            width: `${l}%`
          }
        })
      }), (0, t.jsxs)("div", {
        className: w.default.progressInfo, children: [(0, t.jsxs)("span", {
          className: w.default.progressLabel, children: [a, " R$"]
        }), (0, t.jsxs)("span", {
          className: w.default.progressPercent, children: [l, "%"]
        }), (0, t.jsxs)("span", {
          className: w.default.progressLabel, children: [s, " R$"]
        })]
      })]
    })
  }
  function X(e) {
    if("ROBUX" !== e.subType)return!1; let t = H(e); return"INITIATED" === t || "PROCESSING" === t || "PARTIALLY_COMPLETED" === t || "FINALIZING" === t
  }
  function Y(e) {
    return e.orderId || e.trackingInfo?.orderId || e.txId || void 0
  }
  function Z( {
    type: e, isAuthenticated: l, initialSubType: i, className: n, ...r
  }) {
    var d; let c = "DEPOSIT" === e?B: O, [u, h] = (0, a.useState)(1), [p, x] = (0, a.useState)(0), [y, g] = (0, a.useState)(() => i && c.some(e => e.value === i)?i: c[0].value), [v, N] = (0, a.useState)([]), [S, P] = (0, a.useState)(!1), [I, L] = (0, a.useState)(null), [E, R] = (0, a.useState)(null), A = (0, b.default)(), [D, F] = (0, a.useState)(!1); (0, a.useEffect)(() => {
      F(!0)
    }, []); let M = D && A.width<768, {
      items: q
    }
    = (0, C.default)( {
      count: Math.ceil(p/6), page: u, onChange: (e, t) => {
        h(t)
      }
    }), W = (0, a.useCallback)(async(t = !1) => {
      t || P(!0); try {
        let t = [ {
          field: "type", operator: "equals", value: e
        }, {
          field: "subType", operator: "equals", value: y
        }], a = await (0, j.getDepositsWithdrawalsHistory)(u - 1, 6, t); N(a.depositsWithdrawalsHistory || []), x(a.total || 0)
      }catch(e) {
        t || s.toast.error("Failed to load history, please refresh the page and try again!")
      }finally {
        t || P(!1)
      }
    }, [u, y, e]); (0, a.useEffect)(() => {
      l && W()
    }, [W, l]), (0, a.useEffect)(() => {
      if(!l)return; let e = setInterval(() => W(!0), 1e4); return() => clearInterval(e)
    }, [W, l]); let U = async(e, t) => {
      if(e.stopPropagation(), !E) {
        R(t); try {
          await (0, j.cancelRobuxWithdrawal)(t), s.toast.success("Order cancellation requested"), W(!0)
        }catch(t) {
          let e = t?.response?.data?.msg || t?.response?.data?.error || t?.message || "Failed to cancel order"; s.toast.error(e)
        }finally {
          R(null)
        }
      }
    }, Z = "DEPOSIT" === e?"Deposits": "Withdrawals", z = "WITHDRAWAL" === e && "ROBUX" === y, K = I && "GIFT_CARD" === (d = I).subType?d.cardData?.code?.link: void 0; return(0, t.jsxs)("div", {
      className: (0, _.default)(w.default.statistics, w.default.profileStatistics, n), ...r, children: [(0, t.jsxs)("div", {
        className: w.default.statisticsHeader, children: [(0, t.jsx)(f.default, {
          element: "p", textType: "smHeadlines", className: w.default.statisticsHeaderTitle, children: Z
        }), (0, t.jsxs)("div", {
          style: {
            display: "flex", alignItems: "center", gap: "8px"
          }, children: [(0, t.jsx)("button", {
            onClick: () => W(), disabled: S, className: w.default.refreshButton, title: "Refresh", children: (0, t.jsxs)("svg", {
              width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, t.jsx)("polyline", {
                points: "23 4 23 10 17 10"
              }), (0, t.jsx)("polyline", {
                points: "1 20 1 14 7 14"
              }), (0, t.jsx)("path", {
                d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
              })]
            })
          }), (0, t.jsx)("select", {
            value: y, onChange: e => {
              g(e.target.value), h(1), N([])
            }, className: w.default.statisticsDropdown, children: c.map(e => (0, t.jsx)("option", {
              value: e.value, children: e.label
            }, e.value))
          })]
        })]
      }), M?(0, t.jsxs)("div", {
        className: w.default.cardList, children: [v.length>0 && v.map(e => {
          let a = H(e); return(0, t.jsxs)("div", {
            className: w.default.card, onClick: () => L(e), style: {
              cursor: "pointer"
            }, children: [(0, t.jsxs)("div", {
              className: w.default.cardTop, children: [(0, t.jsxs)("div", {
                className: w.default.cardTopLeft, children: [(0, t.jsx)(f.default, {
                  element: "p", textType: "semibold14", className: w.default.cardLabel, style: {
                    color: G(a)
                  }, children: a
                }), "CRYPTO" === y && e.cryptoAsset && (0, t.jsxs)(f.default, {
                  element: "span", textType: "regular14", className: w.default.cardDetail, children: [e.cryptoAssetAmount, " ", e.cryptoAsset]
                })]
              }), (0, t.jsxs)("div", {
                style: {
                  display: "flex", alignItems: "center", gap: "8px"
                }, children: [z && X(e) && Y(e) && (0, t.jsx)(m.default, {
                  variant: "danger", disabled: E === Y(e), onClick: t => U(t, Y(e)), children: E === Y(e)?"...": "Cancel"
                }), (0, t.jsxs)(f.default, {
                  element: "p", textType: "semibold14", className: w.default.cardAmount, style: {
                    color: "#05d3dd"
                  }, children: [$(z && e.trackingInfo?.coinsCost?e.trackingInfo.coinsCost: e.currencyAmount || e.usdAmount), (0, t.jsx)(k.default, {
                    style: {
                      marginLeft: 4
                    }
                  })]
                })]
              })]
            }), z && (0, t.jsx)("div", {
              className: w.default.cardProgressRow, children: (0, t.jsx)(V, {
                entry: e
              })
            }), (0, t.jsxs)("div", {
              className: w.default.cardBottom, children: [(0, t.jsxs)(f.default, {
                element: "span", textType: "regular14", className: (0, _.default)(w.default.cardDetail, w.default.cardIdCopy), onClick: t => {
                  t.stopPropagation(), navigator.clipboard.writeText(e.id), s.toast.success("ID copied to clipboard")
                }, children: [e.id.substring(0, 8), "..."]
              }), (0, t.jsx)(f.default, {
                element: "span", textType: "regular14", className: w.default.cardDate, children: (0, T.epochToString)(e.created)
              })]
            })]
          }, e.id)
        }), !S && 0 === v.length && (0, t.jsx)("div", {
          className: w.default.cardEmpty, children: (0, t.jsxs)(f.default, {
            element: "p", textType: "regular14", children: ["No ", Z.toLowerCase(), " found"]
          })
        })]
      }): (0, t.jsxs)("table", {
        className: w.default.statisticsTable, children: [(0, t.jsx)("thead", {
          className: w.default.statisticsTableHead, children: (0, t.jsxs)("tr", {
            className: w.default.statisticsTableRow, children: [(0, t.jsx)("td", {
              style: {
                width: "150px"
              }, className: w.default.statisticsTableItem, children: (0, t.jsx)(f.default, {
                element: "p", textType: "regular14", children: "ID"
              })
            }), (0, t.jsx)("td", {
              className: w.default.statisticsTableItem, children: (0, t.jsx)(f.default, {
                element: "p", textType: "regular14", children: "Status"
              })
            }), (0, t.jsx)("td", {
              className: w.default.statisticsTableItem, children: (0, t.jsx)(f.default, {
                element: "p", textType: "regular14", children: "Date and time"
              })
            }), "CRYPTO" === y && (0, t.jsxs)(t.Fragment, {
              children: [(0, t.jsx)("td", {
                className: w.default.statisticsTableItem, children: (0, t.jsx)(f.default, {
                  element: "p", textType: "regular14", children: "Asset"
                })
              }), (0, t.jsx)("td", {
                style: {
                  width: "120px"
                }, className: w.default.statisticsTableItem, children: (0, t.jsx)(f.default, {
                  element: "p", textType: "regular14", children: "Crypto Amount"
                })
              })]
            }), z && (0, t.jsx)("td", {
              className: w.default.statisticsTableItem, children: (0, t.jsx)(f.default, {
                element: "p", textType: "regular14", children: "Progress"
              })
            }), (0, t.jsx)("td", {
              style: {
                width: "120px"
              }, className: w.default.statisticsTableItem, children: (0, t.jsx)(f.default, {
                element: "p", textType: "regular14", children: z?"Cost": "Amount"
              })
            }), z && (0, t.jsx)("td", {
              style: {
                width: "80px"
              }, className: w.default.statisticsTableItem, children: (0, t.jsx)(f.default, {
                element: "p", textType: "regular14"
              })
            })]
          })
        }), (0, t.jsx)("tbody", {
          className: w.default.statisticsTableBody, children: (0, t.jsxs)(t.Fragment, {
            children: [v.length>0 && v.map(e => {
              let a = H(e); return(0, t.jsxs)("tr", {
                className: (0, _.default)(w.default.statisticsTableRow, w.default.statisticsTableRowClickable), onClick: () => L(e), children: [(0, t.jsx)("td", {
                  className: (0, _.default)(w.default.statisticsTableItem, w.default.statisticsTableItemHighlighted, w.default.statisticsTableItemID), children: (0, t.jsx)(f.default, {
                    onClick: () => {
                      navigator.clipboard.writeText(e.id), s.toast.success("ID copied to clipboard")
                    }, element: "p", textType: "semibold14", children: e.id.substring(0, 8)
                  })
                }), (0, t.jsx)("td", {
                  className: (0, _.default)(w.default.statisticsTableItem, w.default.statisticsTableItemHighlighted), children: (0, t.jsx)(f.default, {
                    element: "p", textType: "regular14", style: {
                      color: G(a)
                    }, children: a
                  })
                }), (0, t.jsx)("td", {
                  className: w.default.statisticsTableItem, children: (0, t.jsx)(f.default, {
                    element: "p", textType: "regular14", children: (0, T.epochToString)(e.created)
                  })
                }), "CRYPTO" === y && (0, t.jsxs)(t.Fragment, {
                  children: [(0, t.jsx)("td", {
                    className: (0, _.default)(w.default.statisticsTableItem, w.default.statisticsTableItemHighlighted), children: (0, t.jsx)(f.default, {
                      element: "p", textType: "regular14", children: e.cryptoAsset || "-"
                    })
                  }), (0, t.jsx)("td", {
                    className: (0, _.default)(w.default.statisticsTableItem, w.default.statisticsTableItemHighlighted), children: (0, t.jsx)(f.default, {
                      element: "p", textType: "regular14", children: e.cryptoAssetAmount || "-"
                    })
                  })]
                }), z && (0, t.jsx)("td", {
                  className: (0, _.default)(w.default.statisticsTableItem, w.default.progressCell), children: (0, t.jsx)(V, {
                    entry: e
                  })
                }), (0, t.jsx)("td", {
                  className: (0, _.default)(w.default.statisticsTableItem, w.default.statisticsTableItemAmount), children: (0, t.jsxs)(f.default, {
                    element: "p", textType: "semibold14", style: {
                      color: "#05d3dd"
                    }, children: [$(z && e.trackingInfo?.coinsCost?e.trackingInfo.coinsCost: e.currencyAmount || e.usdAmount), (0, t.jsx)(k.default, {
                      style: {
                        marginLeft: 4
                      }
                    })]
                  })
                }), z && (0, t.jsx)("td", {
                  className: w.default.statisticsTableItem, children: X(e) && Y(e) && (0, t.jsx)(m.default, {
                    variant: "danger", disabled: E === Y(e), onClick: t => U(t, Y(e)), children: E === Y(e)?"...": "Cancel"
                  })
                })]
              }, e.id)
            }), !S && 0 === v.length && (0, t.jsx)("tr", {
              className: w.default.statisticsTableRow, children: (0, t.jsx)("td", {
                className: w.default.statisticsTableItem, colSpan: "CRYPTO" === y || z?6: 4, children: (0, t.jsxs)(f.default, {
                  element: "p", textType: "regular14", style: {
                    textAlign: "center", padding: "24px 0"
                  }, children: ["No ", Z.toLowerCase(), " found"]
                })
              })
            }), (0, t.jsx)("div", {
              style: {
                height: `${58*Math.max(0,6-v.length)}px`
              }
            })]
          })
        })]
      }), (0, t.jsx)("div", {
        className: w.default.statisticsPagination, children: q.map(( {
          page: e, type: a, selected: s, ...l
        }, i) => {
          let n = null; if("start-ellipsis" === a || "end-ellipsis" === a)n = (0, t.jsxs)(m.default, {
            variant: "pagination", disabled: !0, children: [e, "..."]
          }); else if("page" === a)n = (0, t.jsx)(m.default, {
            variant: "pagination", isActive: s, ...l, children: e
          }); else {
            let e = a; "previous" === e && (e = "prev"), n = (0, t.jsx)(m.default, {
              variant: "default", className: w.default.statisticsPaginationLast, ...l, children: e
            })
          }
          return[n]
        })
      }), I && (0, t.jsxs)(o.default, {
        isOpen: !!I, onRequestClose: () => L(null), contentLabel: "Transaction Detail", className: w.default.detailModal, overlayClassName: w.default.detailModalOverlay, closeTimeoutMS: 200, children: [(0, t.jsxs)("div", {
          className: w.default.detailModalHeader, children: [(0, t.jsxs)(f.default, {
            element: "h3", textType: "smHeadlines", children: ["DEPOSIT" === I.type?"Deposit": "Withdrawal", " Details"]
          }), (0, t.jsx)(m.default, {
            onClick: () => L(null), className: w.default.detailModalClose, "aria-label": "Close", children: "×"
          })]
        }), (0, t.jsxs)("div", {
          className: w.default.detailModalBody, children: [(0, t.jsxs)("div", {
            className: w.default.detailRow, children: [(0, t.jsx)("span", {
              className: w.default.detailLabel, children: "ID"
            }), (0, t.jsxs)("span", {
              className: w.default.detailValue, style: {
                cursor: "pointer"
              }, onClick: () => {
                navigator.clipboard.writeText(I.id), s.toast.success("ID copied to clipboard")
              }, children: [I.id.substring(0, 16), "..."]
            })]
          }), (0, t.jsxs)("div", {
            className: w.default.detailRow, children: [(0, t.jsx)("span", {
              className: w.default.detailLabel, children: "Type"
            }), (0, t.jsx)("span", {
              className: w.default.detailValue, children: I.subType
            })]
          }), (0, t.jsxs)("div", {
            className: w.default.detailRow, children: [(0, t.jsx)("span", {
              className: w.default.detailLabel, children: z?"Cost": "Amount"
            }), (0, t.jsxs)("span", {
              className: w.default.detailValue, style: {
                color: "#05d3dd", display: "flex", alignItems: "center", gap: 6, overflow: "visible"
              }, children: [$(z && I.trackingInfo?.coinsCost?I.trackingInfo.coinsCost: I.currencyAmount || I.usdAmount), (0, t.jsx)(k.default, {
                width: 14, height: 14, style: {
                  flexShrink: 0
                }
              })]
            })]
          }), I.usdAmount>0 && (0, t.jsxs)("div", {
            className: w.default.detailRow, children: [(0, t.jsx)("span", {
              className: w.default.detailLabel, children: "USD Value"
            }), (0, t.jsxs)("span", {
              className: w.default.detailValue, children: ["$", I.usdAmount.toFixed(2)]
            })]
          }), I.cryptoAsset && (0, t.jsxs)("div", {
            className: w.default.detailRow, children: [(0, t.jsx)("span", {
              className: w.default.detailLabel, children: "Crypto Asset"
            }), (0, t.jsx)("span", {
              className: w.default.detailValue, children: I.cryptoAsset
            })]
          }), I.cryptoAssetAmount && (0, t.jsxs)("div", {
            className: w.default.detailRow, children: [(0, t.jsx)("span", {
              className: w.default.detailLabel, children: "Crypto Amount"
            }), (0, t.jsx)("span", {
              className: w.default.detailValue, children: I.cryptoAssetAmount
            })]
          }), z && I.trackingInfo?.robuxProgressed != null && I.trackingInfo?.robuxTotal != null && (0, t.jsxs)("div", {
            style: {
              padding: "10px 0"
            }, children: [(0, t.jsx)("span", {
              className: w.default.detailLabel, style: {
                display: "block", marginBottom: "6px"
              }, children: "Robux Progress"
            }), (0, t.jsx)(V, {
              entry: I
            })]
          }), z && X(I) && Y(I) && (0, t.jsx)("div", {
            style: {
              padding: "10px 0"
            }, children: (0, t.jsx)(m.default, {
              variant: "danger", disabled: E === Y(I), onClick: e => U(e, Y(I)), style: {
                width: "100%"
              }, children: E === Y(I)?"Cancelling...": "Cancel Order"
            })
          }), (0, t.jsxs)("div", {
            className: w.default.detailRow, children: [(0, t.jsx)("span", {
              className: w.default.detailLabel, children: "Created"
            }), (0, t.jsx)("span", {
              className: w.default.detailValue, children: (0, T.epochToString)(I.created)
            })]
          }), I.updated && I.updated !== I.created && -1 !== I.updated && (0, t.jsx)("div", {
            className: w.default.detailRow, children: (0, t.jsx)("span", {
              className: w.default.detailValue, children: (0, T.epochToString)(I.updated)
            })
          }), I.cryptoExplorerUrl && (0, t.jsxs)("div", {
            className: w.default.detailRow, children: [(0, t.jsx)("span", {
              className: w.default.detailLabel, children: "Explorer"
            }), (0, t.jsx)("a", {
              href: I.cryptoExplorerUrl, target: "_blank", rel: "noopener noreferrer", className: w.default.detailLink, children: "View on Explorer"
            })]
          }), I.statusChanges && I.statusChanges.length>0 && (0, t.jsxs)("div", {
            className: w.default.detailTimeline, children: [(0, t.jsx)(f.default, {
              element: "p", textType: "semibold14", className: w.default.detailTimelineTitle, children: "Status Timeline"
            }), (0, t.jsx)("div", {
              className: w.default.timelineList, children: I.statusChanges.map((e, a) => {
                let s = a === I.statusChanges.length - 1; return(0, t.jsxs)("div", {
                  className: (0, _.default)(w.default.timelineItem, s && w.default.timelineItemLast), children: [(0, t.jsxs)("div", {
                    className: w.default.timelineIndicator, children: [(0, t.jsx)("div", {
                      className: w.default.timelineDot, style: {
                        background: G(e.status) || "#5f6892"
                      }
                    }), !s && (0, t.jsx)("div", {
                      className: w.default.timelineLine
                    })]
                  }), (0, t.jsxs)("div", {
                    className: w.default.timelineContent, children: [(0, t.jsxs)("div", {
                      className: w.default.timelineStatus, children: [(0, t.jsx)("span", {
                        style: {
                          color: G(e.status) || "#818ebb", fontWeight: 600, fontSize: 13
                        }, children: e.status
                      }), (0, t.jsx)("span", {
                        className: w.default.timelineDate, children: (0, T.epochToString)(e.date)
                      })]
                    }), e.comment && (0, t.jsx)(f.default, {
                      element: "p", textType: "regular14", className: w.default.timelineComment, children: e.comment
                    })]
                  })]
                }, a)
              })
            })]
          }), K && (0, t.jsxs)("div", {
            className: w.default.detailRow, style: {
              marginTop: "24px"
            }, children: [(0, t.jsx)("span", {
              className: w.default.detailLabel, children: "Gift Card"
            }), (0, t.jsx)(m.default, {
              as: "a", variant: "secondary", href: K, target: "_blank", rel: "noopener noreferrer", referrerPolicy: "no-referrer", className: (0, _.default)(w.default.detailLink, w.default.detailLinkButton), children: "Get the code"
            })]
          }), I.cardData?.instructions && (0, t.jsxs)("div", {
            className: w.default.detailRow, children: [(0, t.jsx)("span", {
              className: w.default.detailLabel, children: "Instructions"
            }), (0, t.jsx)("span", {
              className: w.default.detailValue, children: I.cardData.instructions
            })]
          }), I.cardData?.code?.expiryDate && (0, t.jsxs)("div", {
            className: w.default.detailRow, children: [(0, t.jsx)("span", {
              className: w.default.detailLabel, children: "Expires"
            }), (0, t.jsx)("span", {
              className: w.default.detailValue, children: new Date(I.cardData.code.expiryDate).toUTCString()
            })]
          })]
        })]
      })]
    })
  }
  var z = e.i(610041), K = e.i(806777), Q = e.i(445070), J = e.i(356535), ee = e.i(478385), et = e.i(84203); let ea = [ {
    name: "Rain", key: "rainNotificationSettings", toolTipInfo: "Configure notification settings for FlipCoins rains."
  }], es = [ {
    name: "Browser", key: "webNotificationEnabled"
  }, {
    name: "Sms", key: "phoneEnabled"
  }, {
    name: "Email", key: "emailEnabled"
  }], el = e => !!(e.enabled && e.webNotificationEnabled), ei = "10000", en = e => "good" === e?w.default.statusGood: "warn" === e?w.default.statusWarn: w.default.statusBad, er = async(e, t) => await Promise.race([e, new Promise((e, a) => window.setTimeout(() => {
    a(Error("Timed out"))
  }, t))]), ed = function() {
    let e = (0, r.useDispatch)(), [l, i] = (0, a.useState)("rainNotificationSettings"), [n, d] = (0, a.useState)("1000"), [o, c] = (0, a.useState)("1000"), [u, h] = (0, a.useState)(ei), [p, y] = (0, a.useState)( {
      browserPermission: "u"<typeof Notification?"unknown": Notification.permission, pushSupported: !1, pushOptedIn: !1
    }), [g, b] = (0, a.useState)(!1), [v, N] = (0, a.useState)( {
      dailyCaseNotificationSettings: {
        chatEnabled: !1, emailEnabled: !0, enabled: !1, lastSentAt: -1, phoneEnabled: !1, webNotificationEnabled: !1, name: "Daily case"
      }, balanceNotificationSettings: {
        chatEnabled: !0, emailEnabled: !1, enabled: !0, lastSentAt: -1, minimumBalance: 0, phoneEnabled: !1, webNotificationEnabled: !0, name: "Balance"
      }, rainNotificationSettings: {
        chatEnabled: !1, emailEnabled: !1, enabled: !0, lastSentAt: -1, phoneEnabled: !1, webNotificationEnabled: !0, rainMinimum: 1e4, name: "Rain"
      }, rakebackNotificationSettings: {
        chatEnabled: !1, emailEnabled: !1, enabled: !1, lastSentAt: -1, phoneEnabled: !1, webNotificationEnabled: !1, rakebackMinimum: 10, name: "Rakeback"
      }
    }), T = (0, r.useSelector)(e => e.auth.user); (0, a.useEffect)(() => {
      if(T) {
        let e = T.balanceNotificationSettings ?? {
          chatEnabled: !0, emailEnabled: !1, enabled: !0, lastSentAt: -1, minimumBalance: 0, phoneEnabled: !1, webNotificationEnabled: !0
        }, t = T.dailyCaseNotificationSettings ?? {
          chatEnabled: !1, emailEnabled: !0, enabled: !1, lastSentAt: -1, phoneEnabled: !1, webNotificationEnabled: !1
        }, a = T.rainNotificationSettings ?? {
          chatEnabled: !1, emailEnabled: !1, enabled: !0, lastSentAt: -1, phoneEnabled: !1, webNotificationEnabled: !0, rainMinimum: 1e4
        }, s = T.rakebackNotificationSettings ?? {
          chatEnabled: !1, emailEnabled: !1, enabled: !1, lastSentAt: -1, phoneEnabled: !1, webNotificationEnabled: !1, rakebackMinimum: 10
        }; N( {
          dailyCaseNotificationSettings: {
            ...t, name: "Daily case", info: "Configure notification settings for daily cases."
          }, rainNotificationSettings: {
            ...a, name: "Rain", info: "Enable rain notifications and set the minimum rain amount you want to hear about."
          }, rakebackNotificationSettings: {
            ...s, name: "Rakeback", info: "Configure notification settings for rakeback balance reminders."
          }, balanceNotificationSettings: {
            ...e, name: "Balance", info: "Configure notification settings for balance reminders."
          }
        }), h(String(a.rainMinimum ?? 1e4)), d(String(e.minimumBalance ?? 0)), c(String(s.rakebackMinimum ?? 10))
      }
    }, [T]); let _ = async() => {
      let e = "u"<typeof Notification?"unsupported": Notification.permission, t = !1, a = !1; try {
        t = !!et.default?.Notifications?.isPushSupported?.(), a = !!et.default?.User?.PushSubscription?.optedIn
      }catch(e) {
        t = !1, a = !1
      }
      y( {
        browserPermission: e, pushSupported: t, pushOptedIn: a
      })
    }; (0, a.useEffect)(() => {
      _(); let e = () => {
        _()
      }, t = () => {
        document.hidden || _()
      }, a = () => {
        _()
      }; return window.addEventListener("focus", e), document.addEventListener("visibilitychange", t), et.default?.User?.PushSubscription && "function" == typeof et.default.User.PushSubscription.addEventListener && et.default.User.PushSubscription.addEventListener("change", a), () => {
        window.removeEventListener("focus", e), document.removeEventListener("visibilitychange", t), et.default?.User?.PushSubscription && "function" == typeof et.default.User.PushSubscription.removeEventListener && et.default.User.PushSubscription.removeEventListener("change", a)
      }
    }, []), (0, a.useEffect)(() => {
      N(e => ( {
        ...e, rainNotificationSettings: {
          ...e.rainNotificationSettings, rainMinimum: Number(u || 0)
        }, balanceNotificationSettings: {
          ...e.balanceNotificationSettings, minimumBalance: Number(n)
        }, rakebackNotificationSettings: {
          ...e.rakebackNotificationSettings, rakebackMinimum: Number(o)
        }
      }))
    }, [u, n, o]); let k = async() => {
      if("u"<typeof Notification)return void s.default.error("Browser notifications are not supported on this device."); b(!0); try {
        let e = await Notification.requestPermission(); "granted" === e?s.default.success("Browser notifications have been enabled."): "denied" === e && s.default.error("Notifications were blocked. Enable them from your browser site settings to continue.")
      }catch(e) {
        s.default.error("Unable to request browser notification permission.")
      }finally {
        await _(), b(!1)
      }
    }, S = async() => {
      b(!0); try {
        if(!et.default?.Notifications?.isPushSupported?.())return void s.default.error("Push notifications are not supported on this device."); if("granted" !== p.browserPermission)return void await k(); if(et.default?.User?.PushSubscription?.optedIn)return void s.default.success("Push notifications are already enabled."); "function" == typeof et.default?.User?.PushSubscription?.optIn?(await er(et.default.User.PushSubscription.optIn(), 1e4), s.default.success("Push notifications have been enabled.")): "function" == typeof et.default?.Slidedown?.promptPush?(await er(et.default.Slidedown.promptPush(), 1e4), s.default.success("Push notification setup has been opened.")): s.default.error("The notification service is not ready yet. Please try again.")
      }catch(t) {
        let e = t?.message === "Timed out"?"Push setup timed out. This usually happens in local dev or when the browser blocks the prompt.": "Unable to enable push notifications right now."; s.default.error(e)
      }finally {
        await _(), b(!1)
      }
    }, C = async t => {
      try {
        if(t.preventDefault(), (await (0, j.changNotiSettings)(v)).success) {
          let t = {
            balanceNotificationSettings: v.balanceNotificationSettings, dailyCaseNotificationSettings: v.dailyCaseNotificationSettings, rainNotificationSettings: v.rainNotificationSettings, rakebackNotificationSettings: v.rakebackNotificationSettings
          }; e( {
            type: J.UPDATE_NOTIFICATION_SETTINGS, payload: t
          }), await (0, ee.syncOneSignalUserTags)( {
            ...T, ...t
          }, {
            reason: "profile_save"
          }), s.default.success("Your notification settings have been updated.")
        }
      }catch(t) {
        let e = t?.response?.data?.error ?? t?.response?.data?.message ?? t?.message ?? "Failed to update your notifications settings"; s.default.error(e)
      }
    }, P = "granted" === p.browserPermission?"Allowed": "denied" === p.browserPermission?"Blocked": "default" === p.browserPermission?"Not requested": "unsupported" === p.browserPermission?"Unsupported": "Checking", I = "granted" === p.browserPermission?"good": "default" === p.browserPermission?"warn": "bad", L = p.pushOptedIn?"Active": p.pushSupported?"Inactive": "Unavailable", E = p.pushOptedIn?"good": p.pushSupported?"warn": "bad", R = "granted" === p.browserPermission && p.pushSupported && p.pushOptedIn, A = "unsupported" !== p.browserPermission && p.pushSupported; return(0, t.jsxs)("div", {
      className: w.default.notiTab, children: [(0, t.jsx)(Q.default, {
        place: "top", effect: "solid", textColor: "#fff", backgroundColor: "#353b61"
      }), (0, t.jsxs)("div", {
        className: w.default.container, children: [(0, t.jsxs)("div", {
          className: w.default.tabsContainer, children: [(0, t.jsx)("div", {
            className: w.default.between, children: ea.map(( {
              name: e, key: a
            }) => (0, t.jsx)(m.default, {
              onClick: () => {
                i(a)
              }, isActive: a === l, variant: "tab", children: e
            }, a))
          }), (0, t.jsx)(m.default, {
            className: w.default.info, variant: "betOption", "data-tip": v[l].info ?? "some info about notif", children: (0, t.jsx)(K.default, {
              style: {
                height: "1em"
              }
            })
          })]
        }), (0, t.jsxs)("div", {
          className: w.default.tabContent, children: [(0, t.jsxs)(f.default, {
            element: "p", textType: "smHeadlines", className: w.default.tabContentHeading, children: [v[l].name, " Notification"]
          }), "rainNotificationSettings" === l?(0, t.jsxs)(t.Fragment, {
            children: [(0, t.jsx)("div", {
              className: w.default.switchesContainer, children: (0, t.jsxs)("div", {
                className: w.default.switchItem, children: [(0, t.jsx)(z.default, {
                  checked: el(v.rainNotificationSettings), onChange: () => N(e => {
                    let t = !el(e.rainNotificationSettings); return {
                      ...e, rainNotificationSettings: {
                        ...e.rainNotificationSettings, enabled: t, webNotificationEnabled: t
                      }
                    }
                  })
                }), (0, t.jsx)(f.default, {
                  element: "p", textType: "regular14", children: "I want rain notifications"
                })]
              })
            }), (0, t.jsxs)("div", {
              className: w.default.customBalanceWrapper, children: [(0, t.jsxs)("div", {
                className: w.default.notificationSetupCard, children: [(0, t.jsxs)("div", {
                  className: w.default.notificationSetupHeader, children: [(0, t.jsxs)("div", {
                    children: [(0, t.jsx)(f.default, {
                      textType: "semibold14", children: "Browser notification setup"
                    }), (0, t.jsx)(f.default, {
                      textType: "regular14", className: w.default.notificationSetupCopy, children: "Rain alerts need both browser permission and an active push subscription."
                    })]
                  }), (0, t.jsx)(m.default, {
                    type: "button", variant: "secondary", onClick: () => {
                      _()
                    }, disabled: g, children: "Refresh status"
                  })]
                }), (0, t.jsxs)("div", {
                  className: w.default.statusGrid, children: [(0, t.jsxs)("div", {
                    className: w.default.statusRow, children: [(0, t.jsx)(f.default, {
                      textType: "regular14", children: "Browser permission"
                    }), (0, t.jsx)("span", {
                      className: `${w.default.statusBadge} ${en(I)}`, children: P
                    })]
                  }), (0, t.jsxs)("div", {
                    className: w.default.statusRow, children: [(0, t.jsx)(f.default, {
                      textType: "regular14", children: "Push subscription"
                    }), (0, t.jsx)("span", {
                      className: `${w.default.statusBadge} ${en(E)}`, children: L
                    })]
                  }), (0, t.jsxs)("div", {
                    className: w.default.statusRow, children: [(0, t.jsx)(f.default, {
                      textType: "regular14", children: "Ready for rain alerts"
                    }), (0, t.jsx)("span", {
                      className: `${w.default.statusBadge} ${en(R?"good":"warn")}`, children: R?"Ready": "Setup needed"
                    })]
                  })]
                }), !R && (0, t.jsxs)("div", {
                  className: w.default.permissionGuide, children: [(0, t.jsx)(f.default, {
                    textType: "semibold14", children: "Quick setup guide"
                  }), (0, t.jsxs)("div", {
                    className: w.default.guideSteps, children: [(0, t.jsxs)("div", {
                      className: w.default.guideStep, children: [(0, t.jsx)("span", {
                        className: w.default.guideStepNumber, children: "1"
                      }), (0, t.jsx)(f.default, {
                        textType: "regular14", children: "Allow notifications for this site when your browser asks."
                      })]
                    }), (0, t.jsxs)("div", {
                      className: w.default.guideStep, children: [(0, t.jsx)("span", {
                        className: w.default.guideStepNumber, children: "2"
                      }), (0, t.jsx)(f.default, {
                        textType: "regular14", children: "Enable the push subscription so alerts can be delivered."
                      })]
                    }), (0, t.jsxs)("div", {
                      className: w.default.guideStep, children: [(0, t.jsx)("span", {
                        className: w.default.guideStepNumber, children: "3"
                      }), (0, t.jsx)(f.default, {
                        textType: "regular14", children: "If permission is blocked, open your browser site settings and manually allow notifications for this page, then refresh here."
                      })]
                    })]
                  }), (0, t.jsxs)("div", {
                    className: w.default.permissionActions, children: [(0, t.jsx)(m.default, {
                      type: "button", variant: "primary", onClick: k, disabled: g || "unsupported" === p.browserPermission, children: "Request browser permission"
                    }), (0, t.jsx)(m.default, {
                      type: "button", variant: "secondary", onClick: S, disabled: g || "unsupported" === p.browserPermission, children: "Enable push subscription"
                    })]
                  }), "denied" === p.browserPermission && (0, t.jsx)(f.default, {
                    textType: "regular14", className: w.default.permissionHelpText, children: "Your browser has this site blocked. Change the site notification setting to allow, then come back and refresh the status."
                  }), "unsupported" === p.browserPermission && (0, t.jsx)(f.default, {
                    textType: "regular14", className: w.default.permissionHelpText, children: "This browser or device does not support web push notifications, so rain alerts cannot be delivered here."
                  })]
                })]
              }), A && (0, t.jsxs)(t.Fragment, {
                children: [(0, t.jsx)(f.default, {
                  textType: "semibold14", children: "Minimum rain amount"
                }), (0, t.jsx)(f.default, {
                  textType: "regular14", className: w.default.notificationSetupCopy, children: "Only rains at or above this amount will trigger an alert."
                }), (0, t.jsx)(x.default, {
                  type: "text", inputMode: "numeric", pattern: "[0-9]*", value: u, onChange: e => h(e.target.value.replace(/\D/g, "").slice(0, 7)), placeholder: ei
                })]
              })]
            })]
          }): (0, t.jsx)("div", {
            className: w.default.switchesContainer, children: es.map(( {
              name: e, key: a
            }) => (0, t.jsxs)("div", {
              className: w.default.switchItem, children: [(0, t.jsx)(z.default, {
                checked: v[l][a], onChange: () => N(e => ( {
                  ...e, [l]: {
                    ...e[l], [a]: !e[l][a]
                  }
                }))
              }), (0, t.jsx)(f.default, {
                element: "p", textType: "regular14", children: e
              })]
            }, a))
          })]
        }), (0, t.jsx)("form", {
          onSubmit: C, className: w.default.notiSettingsControls, children: (0, t.jsx)(m.default, {
            type: "submit", variant: "primary", children: "Save Changes"
          })
        })]
      })]
    })
  }; var eo = e.i(800517), ec = e.i(350236), eu = e.i(942638), ef = e.i(832056); let em = e => (0, v.default)((0, N.default)(e)), eh = {
    transactions: 0, deposits: 1, withdrawals: 2, settings: 3, "buy-xp": 4
  }, ep = {
    transactions: "Transactions", deposits: "Deposits", withdrawals: "Withdrawals", settings: "Settings", "buy-xp": "Buy XP"
  }, ex = {
    username: 1, fairness: 2, notifications: 3, connections: 4
  }, ey = {
    google: "Google", discord: "Discord"
  }, eg = "that provider", eb = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; o.default.setAppElement("#__next"); let ej = (e, t) => {
    switch(e) {
      case"session-expired": return"Your account linking session expired. Please try again."; case"oauth-cancelled": return t === eg?"Account linking was cancelled.": `${t} linking was cancelled.`; case"oauth-failed": return t === eg?"Unable to complete account linking. Please try again.": `Unable to complete ${t} linking. Please try again.`; case"auth-required": return"You must stay signed in to link a provider to this account."; case"provider-already-linked-here": return t === eg?"That provider is already linked to this account. Unlink it first if you want to replace it.": `A ${t} account is already linked here. Unlink it first if you want to replace it.`; case"provider-linked-elsewhere": return t === eg?"That provider is already linked to another Bloxflip account.": `That ${t} account is already linked to another Bloxflip account.`; default: return t === eg?"Unable to link that provider to your account. Please try again.": `Unable to link ${t} to your account. Please try again.`
    }
  }, ev = e => !!(e && e.startsWith("rblx_") && e.endsWith("@roblox.bloxdrop.local")); function eN( {
    isOpen: e, loading: a, onClose: l, onVerify: i
  }) {
    return(0, t.jsxs)(o.default, {
      isOpen: e, onRequestClose: a?void 0: l, shouldCloseOnEsc: !a, shouldCloseOnOverlayClick: !a, contentLabel: "Email captcha", className: `${y.default.defaultModal} ${y.default.modalChatRules}`, closeTimeoutMS: 200, children: [(0, t.jsx)(h.default, {
        element: "h2", children: "Verify Email"
      }), (0, t.jsx)("div", {
        style: {
          marginTop: "20px"
        }, children: (0, t.jsx)(c.default, {
          theme: "dark", sitekey: "56e4d1ba-0ad2-46b8-83c0-4c80034e5192", onError: e => {
            console.log(e), s.toast.error("Captcha failed, please try again.")
          }, onExpire: () => {
            s.toast.error("The captcha session expired, please try again.")
          }, onVerify: i
        })
      }), (0, t.jsx)(m.default, {
        type: "button", onClick: l, className: y.default.defaultModalClose, "aria-label": "Close", disabled: a
      })]
    })
  }
  let eT = ( {
    user: e, isAuthenticated: o
  }) => {
    let c = (0, d.useRouter)(), u = (0, a.useRef)(null), y = (0, a.useRef)(!1), v = (0, r.useSelector)(e => e.auth.currentCurrency) || "FLIPCOINS", N = (0, r.useSelector)(e => e.auth.wallet?.balances?.XP ?? 0); "ROCOINS" === v?S.default: k.default; let[_, w] = (0, a.useState)(0), [C, P] = (0, a.useState)(void 0), [I, E] = (0, a.useState)(!1); (0, a.useEffect)(() => {
      if(I || !c.isReady)return; let e = c.query.tab?.toLowerCase(); e && void 0 !== eh[e] && w(eh[e]); let t = c.query.subType?.toUpperCase(); t && P(t); let a = c.query.settings?.toLowerCase(); a && void 0 !== ex[a] && $(ex[a]), E(!0)
    }, [c.isReady, c.query]); let[R, A] = (0, a.useState)(), [D, F] = (0, a.useState)(), [M] = (0, a.useState)(!1), [q, W] = (0, a.useState)(0), [U, B] = (0, a.useState)(!1), [O, $] = (0, a.useState)(1), [H, G] = (0, a.useState)(""), [V, X] = (0, a.useState)(!1), [Y, z] = (0, a.useState)(null), [K, Q] = (0, a.useState)(!1), [ee, et] = (0, a.useState)(null), [ea, es] = (0, a.useState)(""), [el, ei] = (0, a.useState)(!1), [en, er] = (0, a.useState)(null), [eT, e_] = (0, a.useState)(!1), [ew, ek] = (0, a.useState)(!1), [eS, eC] = (0, a.useState)(null), [eP, eI] = (0, a.useState)(!1), [eL, eE] = (0, a.useState)(""), [eR, eA] = (0, a.useState)(""), [eD, eF] = (0, a.useState)(""), [eM, eq] = (0, a.useState)(!1), [eW, eU] = (0, a.useState)(!1), [eB, eO] = (0, a.useState)(""), [e$, eH] = (0, a.useState)(!1), eG = eB?.005*Math.floor(parseFloat(eB)): 0, eV = (0, r.useDispatch)(), eX = (0, b.default)(), eY = (0, n.useFeatureIsOn)("fa_links_enabled") ?? !1, eZ = "string" == typeof c.query.settings?c.query.settings.toLowerCase(): null, ez = "string" == typeof c.query.focus?c.query.focus.toLowerCase(): null, eK = !!(eY && o && e?.id), eQ = !!(eY && o && e?.id), eJ = Y?.email ?? e?.email ?? null, e0 = Y?.isRobloxPlaceholderEmail ?? ev(eJ), e1 = eJ && !e0?eJ: null, e4 = eQ && e0, e2 = e4?"Not Linked": eJ?"Email is managed by your current login method.": "Email linking is not available for this account.", e5 = async t => {
      if(t !== q && !U) {
        if(1 === t && !e?.robloxId)return void s.toast.error("No Roblox account linked"); try {
          B(!0); let e = await (0, j.updateUserIdentity)(t); e && e.success?(W(t), s.toast.success("Profile identity updated successfully!"), window.location.reload()): s.toast.error(e?.message || "Failed to update profile identity")
        }catch(e) {
          console.log(e), s.toast.error("Something went wrong...")
        }
      }
    }, e3 = async() => {
      if(H.trim()) {
        X(!0); try {
          let e = await (0, j.UpdateUsername)(H); e && e.success?(s.toast.success("Username updated successfully"), X(!1)): (X(!1), s.toast.error(e?.error || e?.msg || e?.message || "Failed to update username"))
        }catch(e) {
          X(!1), s.toast.error(e.response?.data?.msg ?? 'There was an error updating your username, please try agai"')
        }
      }
    }, e7 = async() => {
      eq(!0); try {
        let e = await (0, j.getProvablyFairData)(); eE(e.clientSeed || ""), eA(e.serverHash || ""), eF(e.nonce || "")
      }catch(e) {
        console.log("Failed to fetch provably fair data:", e)
      }finally {
        eq(!1)
      }
    }, e6 = async() => {
      if(eL.trim()) {
        eU(!0); try {
          (await (0, j.updateClientSeed)(eL)).success && (s.toast.success("Client seed updated successfully!"), e7())
        }catch(e) {
          s.toast.error("Failed to update client seed")
        }finally {
          eU(!1)
        }
      }
    }, e8 = async() => {
      let e = Math.floor(parseFloat(eB)); if(!e || e <= 0)return void s.toast.error("Enter a valid amount"); if(e<200)return void s.toast.error("Minimum swap is 200 FlipCoins"); if(e>1e6)return void s.toast.error("Maximum swap is 1,000,000 FlipCoins"); eH(!0); try {
        let t = await (0, j.swapFlipcoinsToXP)(e); t.success?(s.toast.success(`Swapped ${t.flipcoinsDebited} FlipCoins for ${t.xpCredited} XP`), eV( {
          type: J.WALLET_CHANGE, payload: {
            amount: -t.flipcoinsDebited, currency: "FLIPCOINS"
          }
        }), eV( {
          type: J.WALLET_CHANGE, payload: {
            amount: t.xpCredited, currency: "XP"
          }
        }), eO("")): s.toast.error(t.error || t.message || t.msg || "Swap failed")
      }catch(t) {
        let e = t?.response?.data; s.toast.error(e?.error || e?.message || e?.msg || "Failed to swap. Try again.")
      }finally {
        eH(!1)
      }
    }, e9 = e => {
      let t = new URL(window.location.href); t.searchParams.set("tab", "settings"), e?t.searchParams.set("settings", e): t.searchParams.delete("settings"), c.replace(t.pathname + t.search, void 0, {
        shallow: !0
      })
    }, te = (e, t) => {
      $(e), e9(t)
    }, tt = async() => {
      Q(!0); try {
        let e = await fetch("/api/auth/fusionauth/links", {
          cache: "no-store"
        }), t = await e.json(); if(!e.ok)throw Error(t?.error || "Unable to load linked providers"); z(t)
      }catch(e) {
        console.log("Failed to fetch linked providers:", e), s.toast.error(e?.message || "Unable to load linked providers")
      }finally {
        Q(!1)
      }
    }, ta = async e => {
      if(e.preventDefault(), el || !e4)return; let t = ea.trim().toLowerCase(); !eb.test(t) || ev(t)?s.toast.error("Enter a valid email address."): (ei(!0), eC(t), ek(!0))
    }, ts = async e => {
      if(eS && !eP)try {
        eI(!0); let t = await (0, j.initEmailLink)(eS, e); if(!t?.success)throw Error(t?.error || t?.message || "Unable to send verification email"); er(eS), ek(!1), eC(null), s.toast.success("Verification email sent. Open the link to finish adding your email.")
      }catch(t) {
        let e = t?.response?.data; s.toast.error(e?.error || e?.message || t?.message || "Unable to send verification email"), t?.response?.status === 403 && (await tt(), eV((0, ef.reloadUser)())), ek(!1), eC(null)
      }finally {
        eI(!1), ei(!1)
      }
    }, tl = () => {
      e_(!0)
    }, ti = e => {
      ("Enter" === e.key || " " === e.key) && (e.preventDefault(), tl())
    }; return(0, a.useEffect)(() => {
      (async() => {
        try {
          let t = await (0, j.getUserProfileData)(); A(t), W(t?.user?.identity ?? e?.identity ?? 0)
        }catch(e) {
          console.log(e)
        }
      })()
    }, [e?.identity]), (0, a.useEffect)(() => {
      (async() => {
        try {
          let e = await (0, j.lookupUser)("me"); F(e)
        }catch(e) {
          console.log(e)
        }
      })()
    }, []), (0, a.useEffect)(() => {
      3 === _ && o && e7()
    }, [_, o]), (0, a.useEffect)(() => {
      3 === _ && o && eY && tt()
    }, [_, o, eY]), (0, a.useEffect)(() => {
      es(""), er(null), e_(!1)
    }, [e?.id]), (0, a.useEffect)(() => {
      e_(!1)
    }, [e1, en]), (0, a.useEffect)(() => {
      if(K || !c.isReady)return; let e = "connections" === eZ || "email" === ez; 4 !== O || eK || e || ($(1), e9("username"))
    }, [K, ez, eZ, c.isReady, O, eK]), (0, a.useEffect)(() => {
      c.isReady && eK && "connections" === eZ && 4 !== O && $(4)
    }, [eZ, c.isReady, O, eK]), (0, a.useEffect)(() => {
      if(!c.isReady)return; let e = "string" == typeof c.query.link_provider?c.query.link_provider: null, t = "string" == typeof c.query.link_status?c.query.link_status: null, a = "string" == typeof c.query.link_error_code?c.query.link_error_code: null, l = "auth-required" === a || "link-failed" === a || "oauth-cancelled" === a || "oauth-failed" === a || "provider-already-linked-here" === a || "provider-linked-elsewhere" === a || "session-expired" === a?a: null, i = "string" == typeof c.query.link_error; if(!e && !t && !l && !i)return; let n = "google" === e || "discord" === e?ey[e]: eg; l?s.toast.error(ej(l, n)): i?s.toast.error(ej("link-failed", n)): "linked" === t?s.toast.success(`${n} is now linked to your account`): "already-linked" === t && s.toast.success(`${n} is already linked to this account`); let r = {
        ...c.query
      }; delete r.link_provider, delete r.link_status, delete r.link_error_code, delete r.link_error, c.replace( {
        pathname: c.pathname, query: r
      }, void 0, {
        shallow: !0
      }), 3 === _ && o && eY && tt()
    }, [eY, o, c, _]), (0, a.useEffect)(() => {
      let e = eX.width>0 && eX.width<992; if("email" !== ez) {
        y.current = !1; return
      }
      if(y.current || !c.isReady || !e || 3 !== _ || 4 !== O)return; let t = 0, a = () => {
        if(y.current)return; if(K || !u.current) {
          (t += 1)<20 && window.setTimeout(a, 100); return
        }
        y.current = !0; let e = u.current.getBoundingClientRect().top + window.scrollY - 140; window.scrollTo( {
          top: Math.max(e, 0), behavior: "smooth"
        }); let s = {
          ...c.query
        }; delete s.focus, c.replace( {
          pathname: c.pathname, query: s
        }, void 0, {
          shallow: !0
        })
      }; window.setTimeout(a, 150)
    }, [K, ez, c, O, eX.width, _]), (0, a.useEffect)(() => {
      (async() => {
        try {
          let t = await (0, j.getUserProfileData)(); A(t), W(t?.user?.identity ?? e?.identity ?? 0)
        }catch(e) {
          console.log(e)
        }
      })()
    }, [e?.identity]), (0, t.jsxs)("section", {
      className: g.default.profile, children: [(0, t.jsx)(eN, {
        isOpen: ew, loading: eP, onClose: () => {
          eP || (ek(!1), eC(null), ei(!1))
        }, onVerify: ts
      }), (0, t.jsxs)("div", {
        className: g.default.profileMain, children: [(0, t.jsxs)("div", {
          className: g.default.profileMainUser, children: [(0, t.jsx)(p.default, {
            className: g.default.profileMainUserAvatar, imageAlt: "User avatar", userLevel: (0, T.getLevelFromWager)(e?.lumber), boxSize: "extraLarge", userId: e?.id
          }), (0, t.jsxs)("div", {
            className: g.default.profileMainUserText, children: [(0, t.jsx)(f.default, {
              element: "p", textType: "smHeadlines", children: e?.username
            }), (0, t.jsxs)(f.default, {
              element: "p", textType: "regular14", children: [(e?.created || R?.user?.created) && (0, t.jsxs)(t.Fragment, {
                children: ["Registered on ", (0, T.parseDate)(e?.created || R?.user?.created), " ", (0, t.jsx)("br", {

                })]
              }), "UID: ", (0, t.jsxs)("span", {
                onClick: () => {
                  navigator.clipboard.writeText(e?.id), s.toast.success("Copied to clipboard!")
                }, className: g.default.profileMainUserTextUID, children: [e?.id.substring(0, 8), "..."]
              })]
            })]
          })]
        }), (0, t.jsxs)("div", {
          className: g.default.profileMainBlocks, children: [(0, t.jsxs)("div", {
            className: g.default.profileMainBlock, children: [(0, t.jsx)(f.default, {
              element: "p", textType: "regular14", className: g.default.profileMainBlockTitle, children: "Rain Winnings"
            }), (0, t.jsx)(h.default, {
              element: "h1", as: "div", className: g.default.profileMainBlockContent, children: D && (0, t.jsx)(l.default, {
                duration: 1, formattingFn: em, end: R?.stats?.rainWins ?? 0
              })
            })]
          }), (0, t.jsxs)("div", {
            className: g.default.profileMainBlock, children: [(0, t.jsx)(f.default, {
              element: "p", textType: "regular14", className: g.default.profileMainBlockTitle, children: "Total wagered"
            }), (0, t.jsxs)(h.default, {
              element: "h1", as: "div", className: g.default.profileMainBlockContent, children: [R && !M?(0, t.jsx)(l.default, {
                duration: 1, formattingFn: em, end: R?.stats?.totalPlayed ?? 0
              }): "**,***", " "]
            })]
          }), (0, t.jsxs)("div", {
            className: g.default.profileMainBlock, children: [(0, t.jsx)(f.default, {
              element: "p", textType: "regular14", className: g.default.profileMainBlockTitle, children: "XP Balance"
            }), (0, t.jsx)(h.default, {
              element: "h1", as: "div", className: g.default.profileMainBlockContent, children: (0, t.jsx)(l.default, {
                duration: 1, formattingFn: em, end: N
              })
            })]
          })]
        }), R?.stats?.nextUpdate && (0, t.jsxs)(f.default, {
          element: "p", textType: "regular12", className: g.default.profileMainNextUpdate, children: ["Stat update in ", (0, t.jsx)(i.default, {
            date: R.stats.nextUpdate, renderer: ( {
              minutes: e, seconds: a, completed: s
            }) => s?(0, t.jsx)("span", {
              children: "Updating..."
            }): (0, t.jsxs)("span", {
              children: [e, (0, t.jsx)("small", {
                children: "m"
              }), " ", a, (0, t.jsx)("small", {
                children: "s"
              })]
            })
          })]
        }), eX.width<993 && (0, t.jsx)(m.default, {
          onClick: () => eV( {
            type: J.SHOW_CONFIRM_LGOUT
          }), className: g.default.profileMainButton, variant: "secondary", children: "Log out"
        })]
      }), (0, t.jsxs)("div", {
        className: g.default.profileStats, children: [(0, t.jsx)("div", {
          className: g.default.profileStatsTabs, children: Object.entries(eh).map(([e, a]) => (0, t.jsx)(m.default, {
            onClick: () => {
              w(a); let t = new URL(window.location.href); t.searchParams.set("tab", e), t.searchParams.delete("subType"), t.searchParams.delete("settings"), c.replace(t.pathname + t.search, void 0, {
                shallow: !0
              })
            }, isActive: _ === a, variant: "tab", children: ep[e] || e
          }, e))
        }), o && (0, t.jsxs)(t.Fragment, {
          children: [0 === _ && (0, t.jsx)(L, {
            user: e, isAuthenticated: o
          }), 1 === _ && (0, t.jsx)(Z, {
            type: "DEPOSIT", isAuthenticated: o, initialSubType: C
          }), 2 === _ && (0, t.jsx)(Z, {
            type: "WITHDRAWAL", isAuthenticated: o, initialSubType: C
          }), 4 === _ && (0, t.jsxs)("div", {
            className: g.default.xpSwapSection, children: [(0, t.jsx)(h.default, {
              element: "h2", children: "Swap FlipCoins to XP"
            }), (0, t.jsx)(f.default, {
              element: "p", textType: "regular14", style: {
                marginTop: "20px", color: "rgba(255,255,255,0.5)"
              }, children: "Convert your FlipCoins into XP. Minimum 200 FlipCoins per swap."
            }), (0, t.jsxs)("div", {
              className: "customInput", style: {
                marginTop: "20px"
              }, children: [(0, t.jsx)(f.default, {
                element: "p", textType: "labelsRegular", className: "customInputLabel", children: "FlipCoins Amount"
              }), (0, t.jsxs)("div", {
                className: "customInputInner", children: [(0, t.jsx)("div", {
                  className: "customInputIcon", children: (0, t.jsx)(k.default, {

                  })
                }), (0, t.jsx)(x.default, {
                  type: "number", min: "200", max: "1000000", step: "1", value: eB, onChange: e => eO(e.currentTarget.value), placeholder: "200", disabled: e$, style: {
                    paddingLeft: 39
                  }
                })]
              })]
            }), (0, t.jsxs)("div", {
              className: g.default.xpSwapPreviewBox, children: [(0, t.jsx)("div", {
                className: g.default.xpSwapPreviewLabel, children: "You will receive"
              }), (0, t.jsxs)("div", {
                className: g.default.xpSwapPreviewValue, children: [eG>0?eG.toFixed(2): "0", " XP"]
              })]
            }), (0, t.jsx)("div", {
              className: g.default.xpSwapRateLabel, children: "200 FlipCoins = 1 XP"
            }), (0, t.jsx)(m.default, {
              variant: "primary", onClick: e8, disabled: e$, style: {
                width: "100%", marginTop: "20px"
              }, children: e$?"Swapping...": "Confirm Swap"
            })]
          }), 3 === _ && (0, t.jsxs)("div", {
            className: g.default.settingsSection, children: [(0, t.jsxs)("div", {
              className: g.default.settingsSidebar, children: [(0, t.jsx)("div", {
                className: `${g.default.settingsNavItem} ${1===O?g.default.settingsNavItemActive:""}`, onClick: () => te(1, "username"), children: (0, t.jsx)(f.default, {
                  element: "span", textType: "regular14", children: "Change Username"
                })
              }), (0, t.jsx)("div", {
                className: `${g.default.settingsNavItem} ${2===O?g.default.settingsNavItemActive:""}`, onClick: () => te(2, "fairness"), children: (0, t.jsx)(f.default, {
                  element: "span", textType: "regular14", children: "Provably Fair"
                })
              }), (0, t.jsx)("div", {
                className: `${g.default.settingsNavItem} ${3===O?g.default.settingsNavItemActive:""}`, onClick: () => te(3, "notifications"), children: (0, t.jsx)(f.default, {
                  element: "span", textType: "regular14", children: "Notifications"
                })
              }), eK && (0, t.jsx)("div", {
                className: `${g.default.settingsNavItem} ${4===O?g.default.settingsNavItemActive:""}`, onClick: () => te(4, "connections"), children: (0, t.jsx)(f.default, {
                  element: "span", textType: "regular14", children: "Connected Logins"
                })
              })]
            }), (0, t.jsxs)("div", {
              className: g.default.settingsContent, children: [0 === O && (0, t.jsxs)("div", {
                className: g.default.identitySection, children: [(0, t.jsx)(f.default, {
                  element: "p", textType: "regular14", className: g.default.identityLabel, children: "Display Name"
                }), (0, t.jsxs)("div", {
                  className: g.default.identityOptions, children: [(0, t.jsxs)("div", {
                    onClick: () => e5(0), className: `${g.default.identityOption} ${0===q?g.default.identityOptionActive:""} ${U?g.default.identityOptionDisabled:""}`, children: [(0, t.jsx)("div", {
                      className: g.default.identityRadio, children: 0 === q && (0, t.jsx)("div", {
                        className: g.default.identityRadioInner
                      })
                    }), (0, t.jsxs)("div", {
                      className: g.default.identityContent, children: [(0, t.jsx)(f.default, {
                        element: "span", textType: "regular14", children: "On-Site Identity"
                      }), (0, t.jsxs)(f.default, {
                        element: "span", textType: "regular12", className: g.default.identitySubtext, children: ["@", R?.user?.username || e?.username || "Not set"]
                      })]
                    })]
                  }), (0, t.jsxs)("div", {
                    onClick: () => e5(1), className: `${g.default.identityOption} ${1===q?g.default.identityOptionActive:""} ${!e?.robloxId?g.default.identityOptionUnavailable:""} ${U?g.default.identityOptionDisabled:""}`, children: [(0, t.jsx)("div", {
                      className: g.default.identityRadio, children: 1 === q && (0, t.jsx)("div", {
                        className: g.default.identityRadioInner
                      })
                    }), (0, t.jsxs)("div", {
                      className: g.default.identityContent, children: [(0, t.jsx)(f.default, {
                        element: "span", textType: "regular14", children: "Roblox Identity"
                      }), e?.robloxId?(0, t.jsxs)(f.default, {
                        element: "span", textType: "regular12", className: g.default.identitySubtext, children: ["@", e?.robloxUsername || "Unknown"]
                      }): (0, t.jsx)(f.default, {
                        element: "span", textType: "regular12", className: g.default.identitySubtext, children: "No Roblox account linked"
                      })]
                    })]
                  })]
                })]
              }), 1 === O && (0, t.jsx)("div", {
                className: g.default.changeUsernameSection, children: (0, t.jsxs)("div", {
                  className: g.default.changeUsernameForm, children: [(0, t.jsx)(x.default, {
                    value: H, onChange: e => G(e.currentTarget.value), placeholder: "Enter new username"
                  }), (0, t.jsx)(m.default, {
                    onClick: e3, variant: "primary", disabled: V || !H.trim(), children: V?"Saving...": "Save Changes"
                  })]
                })
              }), 2 === O && (0, t.jsx)("div", {
                className: g.default.provablyFairSection, children: eM?(0, t.jsx)(f.default, {
                  element: "p", textType: "regular14", children: "Loading..."
                }): (0, t.jsxs)(t.Fragment, {
                  children: [(0, t.jsxs)("div", {
                    className: g.default.provablyFairField, children: [(0, t.jsx)(f.default, {
                      element: "p", textType: "regular12", className: g.default.provablyFairLabel, children: "Client Seed"
                    }), (0, t.jsx)(x.default, {
                      value: eL, onChange: e => eE(e.currentTarget.value), placeholder: "Enter client seed"
                    })]
                  }), (0, t.jsxs)("div", {
                    className: g.default.provablyFairField, children: [(0, t.jsx)(f.default, {
                      element: "p", textType: "regular12", className: g.default.provablyFairLabel, children: "Next Server Seed (Hashed)"
                    }), (0, t.jsx)(x.default, {
                      value: eR, disabled: !0, onClick: e => {
                        e.target.select(), navigator.clipboard.writeText(eR), s.toast.success("Copied to clipboard!")
                      }
                    })]
                  }), (0, t.jsxs)("div", {
                    className: g.default.provablyFairField, children: [(0, t.jsx)(f.default, {
                      element: "p", textType: "regular12", className: g.default.provablyFairLabel, children: "Next Nonce"
                    }), (0, t.jsx)(x.default, {
                      value: eD, disabled: !0
                    })]
                  }), (0, t.jsx)(m.default, {
                    onClick: e6, variant: "primary", disabled: eW || !eL.trim(), style: {
                      marginTop: "16px"
                    }, children: eW?"Saving...": "Save Client Seed"
                  })]
                })
              }), 3 === O && (0, t.jsx)(ed, {

              }), eY && 4 === O && (0, t.jsxs)("div", {
                className: g.default.authLinksSection, children: [(0, t.jsx)(f.default, {
                  element: "p", textType: "regular14", className: g.default.authLinksIntro, children: "Manage the methods that can sign in to this account"
                }), K?(0, t.jsx)(f.default, {
                  element: "p", textType: "regular14", children: "Loading linked providers..."
                }): (0, t.jsxs)("div", {
                  className: g.default.authLinksList, children: [(0, t.jsxs)("div", {
                    className: g.default.authLinkRow, ref: u, children: [(0, t.jsxs)("div", {
                      className: g.default.authLinkProvider, children: [(0, t.jsx)("div", {
                        className: `${g.default.authLinkIcon} ${g.default.authLinkIconEmail}`, children: (0, t.jsx)(eo.default, {

                        })
                      }), (0, t.jsxs)("div", {
                        className: g.default.authLinkMeta, children: [(0, t.jsx)("div", {
                          className: g.default.authLinkTitleLine, children: (0, t.jsx)(f.default, {
                            element: "span", textType: "regular14", className: g.default.authLinkTitle, children: "Email"
                          })
                        }), e1?(0, t.jsx)(f.default, {
                          element: "p", textType: "regular14", className: `${g.default.authLinkDetail} ${g.default.authLinkPrivateValue} ${!eT?g.default.authLinkPrivateValueHidden:""}`, onClick: tl, onKeyDown: ti, role: "button", tabIndex: 0, title: eT?void 0: "Click to reveal email", children: e1
                        }): en?(0, t.jsxs)(f.default, {
                          element: "p", textType: "regular14", className: g.default.authLinkDetail, children: ["Verification link sent to", " ", (0, t.jsx)("span", {
                            className: `${g.default.authLinkPrivateValue} ${!eT?g.default.authLinkPrivateValueHidden:""}`, onClick: tl, onKeyDown: ti, role: "button", tabIndex: 0, title: eT?void 0: "Click to reveal email", children: en
                          })]
                        }): (0, t.jsx)(f.default, {
                          element: "p", textType: "regular14", className: g.default.authLinkDetail, children: e2
                        })]
                      })]
                    }), e4 && (0, t.jsx)("div", {
                      className: g.default.authLinkControl, children: (0, t.jsxs)("form", {
                        className: g.default.emailLinkForm, onSubmit: ta, children: [(0, t.jsx)(x.default, {
                          type: "email", value: ea, onChange: e => {
                            es(e.currentTarget.value), er(null)
                          }, placeholder: "Email address", disabled: el
                        }), (0, t.jsx)(m.default, {
                          type: "submit", variant: "primary", disabled: el || !ea.trim(), children: el?"Sending...": "Send link"
                        })]
                      })
                    })]
                  }), ["google", "discord"].map(e => {
                    let a = Y?.links?.[e] ?? null, s = ee === e, l = ey[e], i = "google" === e?ec.default: eu.default, n = a?.displayName || a?.identityProviderName || "Not Linked"; return(0, t.jsxs)("div", {
                      className: g.default.authLinkRow, children: [(0, t.jsxs)("div", {
                        className: g.default.authLinkProvider, children: [(0, t.jsx)("div", {
                          className: `${g.default.authLinkIcon} ${"discord"===e?g.default.authLinkIconDiscord:""}`, children: (0, t.jsx)(i, {

                          })
                        }), (0, t.jsxs)("div", {
                          className: g.default.authLinkMeta, children: [(0, t.jsx)("div", {
                            className: g.default.authLinkTitleLine, children: (0, t.jsx)(f.default, {
                              element: "span", textType: "regular14", className: g.default.authLinkTitle, children: l
                            })
                          }), (0, t.jsx)(f.default, {
                            element: "p", textType: "regular14", className: g.default.authLinkDetail, children: n
                          })]
                        })]
                      }), (0, t.jsx)("div", {
                        className: g.default.authLinkControl, children: !a && (0, t.jsx)(t.Fragment, {
                          children: (0, t.jsx)(m.default, {
                            variant: "primary", className: g.default.authLinkButton, onClick: () => {
                              window.location.href = `/api/auth/fusionauth/link/start?provider=${e}&returnTo=${encodeURIComponent("/profile?tab=settings&settings=connections")}`
                            }, disabled: s || !eQ, children: s?"Connecting...": "Link"
                          })
                        })
                      })]
                    }, e)
                  })]
                })]
              })]
            })]
          })]
        })]
      })]
    })
  }; eT.getLayout = function(e) {
    return(0, t.jsx)(u.default, {
      children: e
    })
  }; let e_ = (0, r.connect)(e => ( {
    user: e.auth.user, isAuthenticated: e.auth.isAuthenticated
  }))(eT); e.s(["Profile", 0, eT, "default", 0, e_], 727677)
}, 285147, (e, t, a) => {
  let s = "/profile"; (window.__NEXT_P = window.__NEXT_P || []).push([s, () => e.r(727677)]), t.hot && t.hot.dispose(function() {
    window.__NEXT_P.push([s])
  })
}]);