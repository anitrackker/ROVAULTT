(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document?document.currentScript: void 0, 806777, e => {
  "use strict"; var a, l = e.i(389959); function t() {
    return(t = Object.assign.bind()).apply(null, arguments)
  }
  e.s(["default", 0, function(e) {
    return l.createElement("svg", t( {
      fill: "#8690bf", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 318.293 318.293", style: {
        enableBackground: "new 0 0 318.293 318.293"
      }, xmlSpace: "preserve"
    }, e), a || (a = l.createElement("path", {
      d: "M159.148 0c-52.696 0-95.544 39.326-95.544 87.662h47.736c0-22.007 21.438-39.927 47.808-39.927 26.367 0 47.804 17.92 47.804 39.927v6.929c0 23.39-10.292 34.31-25.915 50.813-20.371 21.531-45.744 48.365-45.744 105.899h47.745c0-38.524 15.144-54.568 32.692-73.12 17.368-18.347 38.96-41.192 38.96-83.592v-6.929C254.689 39.326 211.845 0 159.148 0zM134.475 277.996h49.968v40.297h-49.968z"
    })))
  }])
}, 572329, e => {
  e.v( {
    gameLayout: "game-layout-module-scss-module__naXBaW__gameLayout", gameLayoutColumn: "game-layout-module-scss-module__naXBaW__gameLayoutColumn", gameLayoutColumnAnotherLeft: "game-layout-module-scss-module__naXBaW__gameLayoutColumnAnotherLeft", gameLayoutColumnAnotherRight: "game-layout-module-scss-module__naXBaW__gameLayoutColumnAnotherRight", gameLayoutColumnLeft: "game-layout-module-scss-module__naXBaW__gameLayoutColumnLeft", gameLayoutColumnRight: "game-layout-module-scss-module__naXBaW__gameLayoutColumnRight", gameLayoutColumnRow: "game-layout-module-scss-module__naXBaW__gameLayoutColumnRow"
  })
}, 66742, e => {
  "use strict"; var a = e.i(478902), l = e.i(944967), t = e.i(572329), s = e.i(187742); let r = {
    left: t.default.gameLayoutColumnLeft, right: t.default.gameLayoutColumnRight, row: t.default.gameLayoutColumnRow, anotherLeft: t.default.gameLayoutColumnAnotherLeft, anotherRight: t.default.gameLayoutColumnAnotherRight
  }; function d( {
    className: e, children: s, ...r
  }) {
    return(0, a.jsx)("div", {
      className: (0, l.default)(t.default.gameLayout, e), ...r, children: s
    })
  }
  d.Column = function( {
    type: e, className: d, children: i, customMobileOrder: n = "initial", mines: u = !1, ...c
  }) {
    let o = (0, s.default)(); return(0, a.jsx)("div", {
      className: (0, l.default)(t.default.gameLayoutColumn, r[e], d), style: {
        order: o.width<993?n: "initial", marginBottom: o.width<993?"55px": ""
      }, ...c, children: i
    })
  }, e.s(["default", () => d], 66742)
}, 843967, e => {
  e.v( {
    blueOne: "loader-module-scss-module__UV9Z7W__blueOne", centered: "loader-module-scss-module__UV9Z7W__centered", loaderContent: "loader-module-scss-module__UV9Z7W__loaderContent", looper: "loader-module-scss-module__UV9Z7W__looper"
  })
}, 85570, e => {
  "use strict"; var a = e.i(478902), l = e.i(944967), t = e.i(843967); let s = ( {
    radius: e, isBlue: s, className: r, centered: d
  }) => (0, a.jsx)("div", {
    className: (0, l.default)(r ?? "", d && t.default.centered), children: (0, a.jsx)("div", {
      className: (0, l.default)(t.default.loaderContent, s && t.default.blueOne), style: {
        width: e ?? 15, height: e ?? 15
      }
    })
  }); e.s(["Loader", 0, s, "default", 0, s])
}, 233876, e => {
  "use strict"; var a = e.i(478902); e.s(["renderer", 0, ( {
    seconds: e, minutes: l, hours: t, days: s, completed: r
  }, d) => {
    if(r)return"Completed"; {
      let r = [s || 0, t || 0, l || 0, e || 0], i = ["Days", "Hours", "Minutes", "Seconds"]; for(let e = 0; e<r.length; e++)if(r[e])break; else r.splice(e, 1), e--; let n = r.map(e => e<10?`0${e}`: e), u = n.join(":"); if(d) {
        let e = []; for(let a = r.length; a--; )r[a] && e.push(`${r[a]} ${i[a]}`); u = e.reverse().join(", ")
      }
      return(0, a.jsx)("span", {
        style: {
          marginLeft: "3px"
        }, children: u
      }, n.join(""))
    }
  }])
}, 563726, e => {
  "use strict"; var a, l = e.i(389959); function t() {
    return(t = Object.assign.bind()).apply(null, arguments)
  }
  e.s(["default", 0, function(e) {
    return l.createElement("svg", t( {
      width: 12, height: 12, xmlns: "http://www.w3.org/2000/svg"
    }, e), a || (a = l.createElement("path", {
      d: "M2.775 2.25v.1H3.6v-.1c0-.29.236-.525.525-.525H9.75c.29 0 .525.235.525.525v5.625c0 .29-.235.525-.525.525h-.1v.825h.1a1.35 1.35 0 0 0 1.35-1.35V2.25A1.35 1.35 0 0 0 9.75.9H4.125a1.35 1.35 0 0 0-1.35 1.35Zm5.1.525H2.25A1.35 1.35 0 0 0 .9 4.125V9.75c0 .745.604 1.35 1.35 1.35h5.625a1.35 1.35 0 0 0 1.35-1.35V4.125a1.35 1.35 0 0 0-1.35-1.35ZM8.4 9.75c0 .29-.235.525-.525.525H2.25a.526.526 0 0 1-.525-.525V4.125c0-.29.236-.525.525-.525h5.625c.29 0 .525.235.525.525V9.75Z"
    })))
  }])
}, 642718, e => {
  e.v( {
    centerContent: "raffle-module-scss-module__Dw6BYW__centerContent", controls: "raffle-module-scss-module__Dw6BYW__controls", copyButton: "raffle-module-scss-module__Dw6BYW__copyButton", countDown: "raffle-module-scss-module__Dw6BYW__countDown", drawing: "raffle-module-scss-module__Dw6BYW__drawing", drawingGrid: "raffle-module-scss-module__Dw6BYW__drawingGrid", drawingGridPairLabel: "raffle-module-scss-module__Dw6BYW__drawingGridPairLabel", drawingGridPairValue: "raffle-module-scss-module__Dw6BYW__drawingGridPairValue", drawingHeading: "raffle-module-scss-module__Dw6BYW__drawingHeading", entryStatus: "raffle-module-scss-module__Dw6BYW__entryStatus", failedContent: "raffle-module-scss-module__Dw6BYW__failedContent", headerActions: "raffle-module-scss-module__Dw6BYW__headerActions", inputBox: "raffle-module-scss-module__Dw6BYW__inputBox", itemImage: "raffle-module-scss-module__Dw6BYW__itemImage", itemInfo: "raffle-module-scss-module__Dw6BYW__itemInfo", itemShadow: "raffle-module-scss-module__Dw6BYW__itemShadow", itemWrap: "raffle-module-scss-module__Dw6BYW__itemWrap", itemsInfoBottom: "raffle-module-scss-module__Dw6BYW__itemsInfoBottom", loaderScreen: "raffle-module-scss-module__Dw6BYW__loaderScreen", makeAffButton: "raffle-module-scss-module__Dw6BYW__makeAffButton", metaCopy: "raffle-module-scss-module__Dw6BYW__metaCopy", norecent: "raffle-module-scss-module__Dw6BYW__norecent", prizeIllustration: "raffle-module-scss-module__Dw6BYW__prizeIllustration", prizePanel: "raffle-module-scss-module__Dw6BYW__prizePanel", prizeValue: "raffle-module-scss-module__Dw6BYW__prizeValue", raffleActions: "raffle-module-scss-module__Dw6BYW__raffleActions", raffleGame: "raffle-module-scss-module__Dw6BYW__raffleGame", raffleGameColumn: "raffle-module-scss-module__Dw6BYW__raffleGameColumn", raffleMetaGrid: "raffle-module-scss-module__Dw6BYW__raffleMetaGrid", raffleMetaItem: "raffle-module-scss-module__Dw6BYW__raffleMetaItem", recentWinners: "raffle-module-scss-module__Dw6BYW__recentWinners", referralLinkDiv: "raffle-module-scss-module__Dw6BYW__referralLinkDiv", referralLinkDivLabel: "raffle-module-scss-module__Dw6BYW__referralLinkDivLabel", spaceBetween: "raffle-module-scss-module__Dw6BYW__spaceBetween", textSpan: "raffle-module-scss-module__Dw6BYW__textSpan", tip: "raffle-module-scss-module__Dw6BYW__tip", titleText: "raffle-module-scss-module__Dw6BYW__titleText", todaysGiveaway: "raffle-module-scss-module__Dw6BYW__todaysGiveaway"
  })
}, 482531, e => {
  "use strict"; var a, l = e.i(478902), t = e.i(383312), s = e.i(578704), r = e.i(245055), d = e.i(389959); e.i(802398); var i = e.i(565252), n = e.i(66742), u = e.i(474861), c = e.i(944967), o = e.i(642718), f = e.i(263203), m = e.i(372045), h = e.i(704884), p = e.i(507689), x = e.i(907153), _ = e.i(356535), g = e.i(85570); let y = e => "number" != typeof e || Number.isNaN(e)?"--": (0, h.default)((0, p.default)(e)), j = ( {
    entry: e, raffle: a, isAuthenticated: t, isLoading: s, ...r
  }) => {
    let d = (0, i.useDispatch)(), n = ((e, a) => {
      let l = e?.wagerPerTicket ?? a?.wagerWeightPerTicket ?? 0; if(!l)return null; let t = (e?.wager ?? 0)%l; return 0 === t?l: l - t
    })(e, a), h = e?.wagerPerTicket ?? a?.wagerWeightPerTicket; return(0, l.jsxs)("div", {
      className: (0, c.default)("gameBlock gameBet", o.default.drawing), ...r, children: [(0, l.jsx)(u.default, {
        className: o.default.drawingHeading, element: "h1", children: "Your raffle entry"
      }), s?(0, l.jsx)("div", {
        className: o.default.centerContent, children: (0, l.jsx)(g.Loader, {
          isBlue: !0, radius: 28
        })
      }): t?a?(0, l.jsxs)(l.Fragment, {
        children: [(0, l.jsxs)("div", {
          className: o.default.drawingGrid, children: [(0, l.jsxs)("div", {
            className: o.default.drawingGridPair, children: [(0, l.jsx)(m.default, {
              element: "p", textType: "regular14", className: o.default.drawingGridPairLabel, children: "Your tickets"
            }), (0, l.jsx)(u.default, {
              className: o.default.drawingGridPairValue, element: "h1", children: y(e?.tickets ?? 0)
            })]
          }), (0, l.jsxs)("div", {
            className: o.default.drawingGridPair, children: [(0, l.jsx)(m.default, {
              element: "p", textType: "regular14", className: o.default.drawingGridPairLabel, children: "Eligible wager"
            }), (0, l.jsxs)(u.default, {
              className: o.default.drawingGridPairValue, element: "h1", children: [y(e?.wager ?? 0), (0, l.jsx)(f.default, {

              })]
            })]
          }), (0, l.jsxs)("div", {
            className: o.default.drawingGridPair, children: [(0, l.jsx)(m.default, {
              element: "p", textType: "regular14", className: o.default.drawingGridPairLabel, children: "Wager per ticket"
            }), (0, l.jsxs)(u.default, {
              className: o.default.drawingGridPairValue, element: "h1", children: [y(h), (0, l.jsx)(f.default, {

              })]
            })]
          }), (0, l.jsxs)("div", {
            className: o.default.drawingGridPair, children: [(0, l.jsx)(m.default, {
              element: "p", textType: "regular14", className: o.default.drawingGridPairLabel, children: "Next ticket"
            }), (0, l.jsxs)(u.default, {
              className: o.default.drawingGridPairValue, element: "h1", children: [null === n?"--": y(n), null !== n && (0, l.jsx)(f.default, {

              })]
            })]
          })]
        }), (0, l.jsx)(m.default, {
          element: "span", textType: "regular14", className: o.default.tip, children: "Tickets update automatically as eligible wagers are counted for this raffle."
        })]
      }): (0, l.jsx)("div", {
        className: o.default.centerContent, children: (0, l.jsx)(m.default, {
          element: "p", textType: "regular14", className: o.default.drawingGridPairLabel, children: "There is no active raffle right now."
        })
      }): (0, l.jsxs)("div", {
        className: o.default.centerContent, children: [(0, l.jsx)(m.default, {
          element: "p", textType: "regular14", className: o.default.drawingGridPairLabel, children: "Sign in to see your tickets and wager progress."
        }), (0, l.jsx)(x.default, {
          variant: "primary", onClick: () => {
            d( {
              type: _.SHOW_LOGIN
            })
          }, children: "Sign in"
        })]
      })]
    })
  }; var w = e.i(33892), b = e.i(56040); let v = e => "number" != typeof e || Number.isNaN(e)?"0": (0, h.default)((0, p.default)(e)), N = ( {
    ...e
  }) => {
    let[a, t] = (0, d.useState)(!1), {
      isAuthenticated: s
    }
    = (0, i.useSelector)(e => e.auth), [r, n] = (0, d.useState)([]), [h, p] = (0, d.useState)( {

    }); (0, d.useEffect)(() => {
      (async() => {
        try {
          let e = await (0, b.getRaffleHistory)(); e?.success && Array.isArray(e.raffles) && n(e.raffles)
        }catch(e) {
          console.log(e), n([])
        }
      })()
    }, [s]); let _ = (0, d.useMemo)(() => r.flatMap(e => (e.winners || []).map(a => ( {
      ...a, raffleId: e._id, endedAt: e.endAt
    }))).sort((e, a) => a.endedAt - e.endedAt || a.winAmount - e.winAmount), [r]), g = _.reduce((e, a) => e + a.winAmount, 0); return(0, d.useEffect)(() => {
      let e = Array.from(new Set(_.map(e => e.playerId).filter(Boolean))).filter(e => !(e in h)); if(!e.length)return; let a = !1; return(async() => {
        let l = await Promise.all(e.map(async e => {
          try {
            let a = await (0, b.lookupUser)(e); return[e, a]
          }catch(a) {
            return console.log(a), [e, null]
          }
        })); a || p(e => ( {
          ...e, ...Object.fromEntries(l)
        }))
      })(), () => {
        a = !0
      }
    }, [_, h]), (0, l.jsx)("div", {
      className: (0, c.default)("gameBlock gamePlayers gamePlayersScrollable", o.default.recentWinners), ...e, children: (0, l.jsxs)("div", {
        className: (0, c.default)("gamePlayersScroller"), children: [(0, l.jsxs)("table", {
          className: (0, c.default)("gamePlayersTable", !a && "gamePlayersTableHidden"), children: [(0, l.jsx)("thead", {
            className: (0, c.default)("gamePlayersTableHead"), children: (0, l.jsxs)("tr", {
              className: (0, c.default)("gamePlayersTableRow"), children: [(0, l.jsx)("td", {
                className: (0, c.default)("gamePlayersTableItem"), children: (0, l.jsx)(u.default, {
                  element: "h3", children: "Recent winners"
                })
              }), (0, l.jsx)("td", {
                className: (0, c.default)("gamePlayersTableItem")
              }), (0, l.jsx)("td", {
                className: (0, c.default)("gamePlayersTableItem"), children: (0, l.jsxs)(m.default, {
                  element: "p", textType: "regular14", children: [v(g), " ", (0, l.jsx)(f.default, {

                  })]
                })
              })]
            })
          }), (0, l.jsx)("tbody", {
            className: "gamePlayersTableBody", children: _.length?_.map((e, a) => {
              var t; let s = h[e.playerId], r = s?.username, d = r || ((t = e.playerId)?t.length <= 12?t: `${t.slice(0,6)}...${t.slice(-4)}`: "Unknown player"); return(0, l.jsxs)("tr", {
                style: {
                  flexWrap: "nowrap"
                }, className: (0, c.default)("gamePlayersTableRow"), children: [(0, l.jsx)("td", {
                  className: (0, c.default)("gamePlayersTableItem gamePlayersTableUser"), children: (0, l.jsxs)(m.default, {
                    element: "p", style: {
                      width: "13em"
                    }, textType: "regular14", children: [(0, l.jsx)(w.default, {
                      className: (0, c.default)("gamePlayersTableItemAvatar"), userId: e.playerId, isPrivateMode: r?.toLowerCase() === "anonymous", imageAlt: "User avatar", boxSize: "medium"
                    }), " ", (0, l.jsx)("span", {
                      children: d
                    })]
                  })
                }), (0, l.jsx)("td", {
                  className: (0, c.default)("gamePlayersTableItem gamePlayersTableItemCoeff"), children: (0, l.jsxs)(m.default, {
                    element: "p", textType: "semibold14", children: [v(e.tickets), " tickets"]
                  })
                }), (0, l.jsx)("td", {
                  className: (0, c.default)("gamePlayersTableItem gamePlayersTableItemAmount"), children: (0, l.jsxs)(m.default, {
                    element: "p", textType: "semibold14", children: [v(e.winAmount), (0, l.jsx)(f.default, {

                    })]
                  })
                })]
              }, `${e.raffleId}-${e.playerId}-${a}`)
            }): (0, l.jsx)("tr", {
              children: (0, l.jsx)("td", {
                children: (0, l.jsx)(m.default, {
                  element: "span", textType: "regular14", className: o.default.norecent, children: "No recent winners yet"
                })
              })
            })
          })]
        }), _.length>0?(0, l.jsx)(x.default, {
          onClick: () => t(!a), variant: "secondary", className: (0, c.default)("gamePlayersExpand"), children: a?"Show Less": "Show more"
        }): null]
      })
    })
  }; var T = e.i(692742), P = e.i(563726), B = e.i(806777), C = e.i(455675), W = e.i(94751), k = e.i(349792), L = e.i(977331), D = e.i(965783), I = e.i(359566), A = e.i(900960), S = e.i(793555); W.default.setAppElement("#__next"); let R = function( {
    className: e, isOpen: a, onClose: t
  }) {
    let[s] = (0, d.useState)(6), [r, i] = (0, d.useState)([]), [n, o] = (0, d.useState)(!1), [_, g] = (0, d.useState)(1), y = d.default.useMemo(() => (0, I.getGapWidth)("margin"), ["margin"]); function j() {
      g(1), document.body.style.overflow = "initial", document.body.style.paddingRight = "0px", t()
    }
    (0, d.useEffect)(() => {
      a && (setTimeout(() => {
        document.body.style.overflow = "hidden", document.body.style.paddingRight = y.gap + "px"
      }, 0), (async() => {
        try {
          let e = await (0, b.getRaffleHistory)(); e?.success && Array.isArray(e.raffles) && i([...e.raffles].sort((e, a) => (a.endAt ?? 0) - (e.endAt ?? 0))), o(!0)
        }catch(e) {
          j(), T.toast.error("There was an error while fetching the raffle history, please try again!")
        }
      })())
    }, [a]); let {
      items: w
    }
    = (0, k.default)( {
      count: Math.max(1, Math.ceil(r.length/s)), page: _, onChange: (e, a) => {
        g(a)
      }
    }), v = (0, S.default)(r, s, _); return(0, l.jsxs)(W.default, {
      isOpen: a, onRequestClose: j, contentLabel: "Raffle history modal", className: (0, c.default)(D.default.defaultModal, D.default.modalChatRules, D.default.modalWithdraw, e), closeTimeoutMS: 200, style: {
        overlay: {
          zIndex: 1e7
        }, content: {
          zIndex: 1e7
        }
      }, children: [(0, l.jsx)(u.default, {
        style: {
          marginBottom: "1em"
        }, element: "h2", className: D.default.modalDepositTitle, children: "Raffle history"
      }), (0, l.jsx)("div", {
        className: D.default.tableModal, children: (0, l.jsxs)("table", {
          className: L.default.statisticsTable, children: [(0, l.jsx)("thead", {
            className: L.default.statisticsTableHead, children: (0, l.jsxs)("tr", {
              className: L.default.statisticsTableRow, children: [(0, l.jsx)("td", {
                className: L.default.statisticsTableItem, children: (0, l.jsx)(m.default, {
                  element: "p", textType: "regular14", children: "Prize pool"
                })
              }), (0, l.jsx)("td", {
                className: L.default.statisticsTableItem, children: (0, l.jsx)(m.default, {
                  element: "p", textType: "regular14", children: "Winners"
                })
              }), (0, l.jsx)("td", {
                className: L.default.statisticsTableItem, children: (0, l.jsx)(m.default, {
                  element: "p", textType: "regular14", children: "Ended"
                })
              })]
            })
          }), (0, l.jsxs)("tbody", {
            className: L.default.statisticsTableBody, children: [v.map(e => {
              var a; return(0, l.jsxs)("tr", {
                className: L.default.statisticsTableRow, children: [(0, l.jsx)("td", {
                  className: (0, c.default)(L.default.statisticsTableItem, L.default.statisticsTableItemGame), children: (0, l.jsxs)(m.default, {
                    element: "p", textType: "regular14", children: ["number" != typeof(a = e.prizeAmount) || Number.isNaN(a)?"--": (0, h.default)((0, p.default)(a)), " ", (0, l.jsx)(f.default, {

                    })]
                  })
                }), (0, l.jsx)("td", {
                  className: (0, c.default)(L.default.statisticsTableItem, L.default.statisticsTableItemGame), children: (0, l.jsx)(m.default, {
                    element: "p", textType: "regular14", children: e.winners?.length || e.usersToReceivePrize || "--"
                  })
                }), (0, l.jsx)("td", {
                  className: (0, c.default)(L.default.statisticsTableItem, L.default.statisticsTableItemUser), children: (0, l.jsx)(m.default, {
                    element: "p", textType: "regular14", children: (0, A.epochToString)(e.endAt)
                  })
                })]
              }, e._id)
            }), n && !r.length && (0, l.jsx)("tr", {
              className: L.default.statisticsTableRow, children: (0, l.jsx)("td", {
                className: L.default.statisticsTableItem, colSpan: 3, children: (0, l.jsx)(m.default, {
                  element: "p", textType: "regular14", children: "No past raffles yet"
                })
              })
            })]
          })]
        })
      }), (0, l.jsx)("div", {
        className: L.default.statisticsPagination, children: w.map(( {
          page: e, type: a, selected: t, ...s
        }, r) => {
          let i = null; if("start-ellipsis" === a || "end-ellipsis" === a)i = (0, l.jsxs)(x.default, {
            variant: "pagination", disabled: !0, children: [e, "..."]
          }); else if("page" === a)i = (0, l.jsx)(x.default, {
            variant: "pagination", isActive: t, ...s, children: e
          }); else {
            let e = a; "previous" === e && (e = "prev"), i = (0, l.jsx)(x.default, {
              variant: "default", className: L.default.statisticsPaginationLast, ...s, children: e
            })
          }
          return(0, l.jsx)(d.default.Fragment, {
            children: i
          }, r)
        })
      }), (0, l.jsx)(x.default, {
        style: {
          width: "100%", marginTop: "1em"
        }, variant: "primary", onClick: j, className: D.default.modalWithdrawButton, children: "Close"
      }), (0, l.jsx)(x.default, {
        onClick: j, className: D.default.defaultModalClose, "aria-label": "Close"
      })]
    })
  }; function Y() {
    return(Y = Object.assign.bind()).apply(null, arguments)
  }
  let G = function(e) {
    return d.createElement("svg", Y( {
      fill: "none", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 10 7"
    }, e), a || (a = d.createElement("path", {
      d: "M.75 6.25S2 3.75 5 3.75s4.25 2.5 4.25 2.5M3.5 1a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.5 1a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
    })))
  }; var M = e.i(177044), E = e.i(233876); let z = e => "number" != typeof e || Number.isNaN(e)?"--": (0, h.default)((0, p.default)(e)), H = e => e?new Date(e).toLocaleString(): "--", O = ( {
    raffle: e, entry: a, isAuthenticated: t, reloadData: s, ...r
  }) => {
    let n = (0, M.useRouter)(), h = (0, i.useDispatch)(), [p, y] = (0, d.useState)(!1), j = (e, a) => {
      a && (navigator.clipboard.writeText(a), T.toast.success(`${e} copied!`))
    }; return(0, l.jsxs)("div", {
      className: (0, c.default)("", o.default.raffleGame), ...r, children: [e?(0, l.jsxs)(l.Fragment, {
        children: [(0, l.jsx)("div", {
          className: o.default.spaceBetween, children: (0, l.jsxs)("div", {
            className: o.default.headerActions, children: [(0, l.jsx)(x.default, {
              onClick: () => h( {
                type: _.SHOW_INFO_MODAL, payload: "Raffle"
              }), variant: "betOptionCompact", children: (0, l.jsx)(B.default, {
                style: {
                  height: ".75em"
                }
              })
            }), (0, l.jsx)(x.default, {
              onClick: () => y(!0), variant: "betOptionCompact", children: "History"
            })]
          })
        }), (0, l.jsx)(u.default, {
          className: o.default.todaysGiveaway, element: "h2", children: "Current raffle"
        }), (0, l.jsx)(u.default, {
          className: o.default.countDown, element: "h2", children: (0, l.jsx)(C.default, {
            daysInHours: !0, date: e.endAt, renderer: E.renderer, onComplete: () => {
              T.toast.success("Raffle ended, switching to the next raffle in 10 seconds...", {
                duration: 1e4
              }), setTimeout(() => {
                s()
              }, 1e4)
            }
          })
        }), (0, l.jsx)(m.default, {
          element: "p", style: {
            fontSize: "16px"
          }, textType: "regular16", className: o.default.drawingGridPairLabel, children: "Until drawing"
        }), (0, l.jsxs)("div", {
          className: o.default.prizePanel, children: [(0, l.jsx)("img", {
            src: "/illustrations/affiliates/invite-rewards.svg", alt: "Raffle prize", className: o.default.prizeIllustration
          }), (0, l.jsx)(m.default, {
            element: "p", style: {
              fontSize: "16px"
            }, textType: "regular16", className: o.default.drawingGridPairLabel, children: "Prize amount"
          }), (0, l.jsxs)(u.default, {
            className: o.default.prizeValue, element: "h2", children: [z(e.prizeAmount), (0, l.jsx)(f.default, {

            })]
          }), t && (0, l.jsxs)(m.default, {
            element: "p", textType: "regular14", className: o.default.entryStatus, children: ["You currently have ", z(a?.tickets ?? 0), " tickets."]
          })]
        }), (0, l.jsxs)("div", {
          className: o.default.raffleMetaGrid, children: [(0, l.jsxs)("div", {
            className: o.default.raffleMetaItem, children: [(0, l.jsx)(m.default, {
              element: "p", textType: "regular14", children: "Winners"
            }), (0, l.jsx)(u.default, {
              element: "h4", children: z(e.usersToReceivePrize)
            })]
          }), (0, l.jsxs)("div", {
            className: o.default.raffleMetaItem, children: [(0, l.jsx)(m.default, {
              element: "p", textType: "regular14", children: "Starts"
            }), (0, l.jsx)(u.default, {
              element: "h4", children: H(e.startAt)
            })]
          }), (0, l.jsxs)("div", {
            className: o.default.raffleMetaItem, children: [(0, l.jsx)(m.default, {
              element: "p", textType: "regular14", children: "Ends"
            }), (0, l.jsx)(u.default, {
              element: "h4", children: H(e.endAt)
            })]
          }), (0, l.jsxs)("div", {
            className: o.default.raffleMetaItem, children: [(0, l.jsx)("button", {
              type: "button", className: o.default.metaCopy, onClick: () => j("Raffle ID", e._id), "aria-label": "Copy Raffle ID", children: (0, l.jsx)(P.default, {

              })
            }), (0, l.jsx)(m.default, {
              element: "p", textType: "regular14", children: "Raffle ID"
            }), (0, l.jsx)(u.default, {
              element: "h4", children: e._id || "--"
            })]
          }), (0, l.jsxs)("div", {
            className: o.default.raffleMetaItem, children: [(0, l.jsx)("button", {
              type: "button", className: o.default.metaCopy, onClick: () => j("Private hash", e.privateHash), "aria-label": "Copy private hash", children: (0, l.jsx)(P.default, {

              })
            }), (0, l.jsx)(m.default, {
              element: "p", textType: "regular14", children: "Private hash"
            }), (0, l.jsx)(u.default, {
              element: "h4", children: e.privateHash || "--"
            })]
          }), (0, l.jsxs)("div", {
            className: o.default.raffleMetaItem, children: [(0, l.jsx)("button", {
              type: "button", className: o.default.metaCopy, onClick: () => j("Public seed", e.publicSeed), "aria-label": "Copy public seed", children: (0, l.jsx)(P.default, {

              })
            }), (0, l.jsx)(m.default, {
              element: "p", textType: "regular14", children: "Public seed"
            }), (0, l.jsx)(u.default, {
              element: "h4", children: e.publicSeed || "--"
            })]
          }), (0, l.jsxs)("div", {
            className: o.default.raffleMetaItem, children: [(0, l.jsx)(m.default, {
              element: "p", textType: "regular14", children: "EOS block"
            }), (0, l.jsx)(u.default, {
              element: "h4", children: e.committedEosBlock>0?z(e.committedEosBlock): "--"
            })]
          })]
        }), (0, l.jsx)("div", {
          className: o.default.raffleActions, children: (0, l.jsx)(x.default, {
            variant: "primary", onClick: () => {
              t?n.push("/"): h( {
                type: _.SHOW_LOGIN
              })
            }, children: t?"Play games": "Sign in to enter"
          })
        })]
      }): null === e?(0, l.jsx)(g.Loader, {
        isBlue: !0, radius: 30, className: o.default.loaderScreen
      }): (0, l.jsxs)("div", {
        className: o.default.failedContent, children: [(0, l.jsx)(G, {

        }), (0, l.jsx)(m.default, {
          element: "p", textType: "regular16", className: o.default.titleText, children: "No raffle game available for now"
        }), (0, l.jsx)(x.default, {
          variant: "primary", onClick: () => n.push("/"), children: "Back to home page"
        }), (0, l.jsx)(x.default, {
          variant: "secondary", onClick: () => y(!0), children: "View past raffles"
        })]
      }), (0, l.jsx)(R, {
        isOpen: p, onClose: () => y(!1)
      })]
    })
  }; var V = e.i(187742); let U = (0, i.connect)(e => ( {
    user: e.auth.user, isAuthenticated: e.auth.isAuthenticated
  }))(( {
    user: e, isAuthenticated: a, ...t
  }) => {
    let s = (0, M.useRouter)(), {
      width: r
    }
    = (0, V.default)(), [i, u] = (0, d.useState)(null), [c, f] = (0, d.useState)(null), [m, h] = (0, d.useState)(!1), p = async() => {
      try {
        let e, a = await (0, b.getActiveRaffle)(); a?.success && (e = a.raffle) && "object" == typeof e && e._id?u(a.raffle): u(!1)
      }catch(e) {
        u(!1), console.log(e)
      }
      if(!a) {
        f(null), h(!1); return
      }
      h(!0); try {
        let e, a = await (0, b.getMyRaffleEntry)(); a?.success && (e = a.entry) && "object" == typeof e && e.raffleId?f(a.entry): f(null)
      }catch(e) {
        f(null), console.log(e)
      }finally {
        h(!1)
      }
    }; return(0, d.useEffect)(() => {
      p()
    }, [a, s.asPath]), (0, l.jsx)(l.Fragment, {
      children: (0, l.jsxs)(n.default, {
        ...t, children: [(0, l.jsxs)(n.default.Column, {
          style: r>993? {
            width: "35%"
          }
          : {

          }, type: "left", children: [(0, l.jsx)(j, {
            entry: c, raffle: i || null, isAuthenticated: a, isLoading: m || null === i
          }), (0, l.jsx)(N, {

          })]
        }), (0, l.jsx)(n.default.Column, {
          style: r>993? {
            width: "calc(65% - 30px)"
          }
          : {

          }, customMobileOrder: "-1", type: "right", className: o.default.raffleGameColumn, children: (0, l.jsx)(O, {
            raffle: i, entry: c, isAuthenticated: a, reloadData: () => p()
          })
        })]
      })
    })
  }); function $() {
    return(0, l.jsxs)(l.Fragment, {
      children: [(0, l.jsx)(s.default, {
        title: "Raffle | Bloxflip - R$ Social Casino & Arcade", description: "Enter the Raffle on Bloxflip — buy tickets for a chance to win the pot. Provably fair raffle draws on the #1 R$ social casino and arcade."
      }), (0, l.jsx)(r.BreadcrumbStructuredData, {
        items: [ {
          name: "Home", url: "https://bloxflip.com"
        }, {
          name: "Raffle", url: "https://bloxflip.com/raffle"
        }]
      }), (0, l.jsx)(U, {

      })]
    })
  }
  $.getLayout = function(e) {
    return(0, l.jsx)(t.default, {
      children: e
    })
  }, e.s(["default", () => $], 482531)
}, 106405, (e, a, l) => {
  let t = "/raffle"; (window.__NEXT_P = window.__NEXT_P || []).push([t, () => e.r(482531)]), a.hot && a.hot.dispose(function() {
    window.__NEXT_P.push([t])
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