// @flow 

export const DraftPage = () => {
  return(
    <div id="container">
      <div id="tracker-header">
        <h1 className="game-deck-title gamecomplete">Draft Picks</h1>
        <ReturnLink />
        <HeaderButtons />
      </div>
      <div id="tracker-body">
        {<!-- START Game View -->}
        <div id="draft-collection-list">
          {<!-- check with settings for inclusion -->}
          <ErrorCount errorCount={error_count} />
          {<!-- always visible; messages not necessarily all visible and check is in mapStateToProps -->}
          <MessageList messageIDs={messages}/>
          <DraftList />
        </div>
      </div>
    </div>
  )
}