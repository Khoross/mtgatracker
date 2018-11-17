// @flow 

export const WinLossEntry = connect(
  (store, props) => (
    store.settings.winLossCounter && store.settings.winLossCounter[props.type] && store.settings.winLossCounter[props.type][props.deck] ?
  {
    wins: store.settings.winLossCounter[props.type][props.deck].win,
    losses: store.settings.winLossCounter[props.type][props.deck].loss
  } :
  {
    wins: 0,
    losses: 0
  })
)((props) => {
  return(
    <div className="win-loss-div" >
      <span className="win-loss-label">
        {props.label}
      </span>
      <span className="win-loss-counter">
        {`W : ${props.wins} \xa0\u2014\xa0 L : ${props.losses}`}
      </span>
    </div>
  )
})