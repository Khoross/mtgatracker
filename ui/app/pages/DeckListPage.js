// @flow 

export const DeckListPage = () => {
  return (
    <div id="container">
      <div id="tracker-header">
        <h1 className="beleren header-title">MTGA Tracker</h1>
        <HeaderButtons />
      </div>
      <div id="tracker-body">
        {<!-- START Game View -->}
        <div id="game-deck-list">
          {<!-- checks to settings for which of these are visible -->}
          <div className="win-loss-group">
            <WinLossEntry label="Total" wins={totalWinCounter} losses={totalLossCounter}/>
            <WinLossEntry label="Session Total" wins={dailyTotalWinCounter} losses={dailyTotalLossCounter}/>
          </div>
          {<!-- check with settings for inclusion -->}
          <div id="decklists-container">
            <VaultProgress progress={lastVaultProgress}/>
            <h3 class="reminder">Pick a deck, or start a game!</h3>
            {<!-- always visible; messages not necessarily all visible and check is in mapStateToProps -->}
            <MessageList messageIDs={messages}/>
            {<!-- internally checks if there are entries; if not, renders warning <p> tag -->}
            <DeckList />
          </div>
        </div>
      </div>
    </div>
  )
}