// @flow 

export const DeckDetailsPage = () => {
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
          <div class="win-loss-group">
            <WinLossEntry label="Total" wins={totalWinCounter} losses={totalLossCounter}/>
            <WinLossEntry label="Session Total" wins={dailyTotalWinCounter} losses={dailyTotalLossCounter}/>
          </div>
          <div class="win-loss-group">
            <WinLossEntry label="Deck" wins={deckWinCounter} losses={deckLossCounter}/>
            <WinLossEntry label="Session Deck" wins={dailyDeckWinCounter} losses={dailyDeckLossCounter}/>
          </div>
          {<!-- check with settings for inclusion -->}
          <VaultProgress progress={lastVaultProgress}/>
          {<!-- always visible; messages not necessarily all visible and check is in mapStateToProps -->}
          <MessageList messageIDs={messages}/>
          {<!-- this is a slightly different arrangement to base -->
                    <!-- original has return link and title inside the deck list -->
                    <!-- Consider altering title display to spport re-use -->}
          <ReturnLink />
          <h1 class="deck-title"> <i class="fas fa-chevron-left"></i>{deck_name}</h1>
          <CardList deck={match.id} />
        </div>
      </div>
    </div>
  )
}