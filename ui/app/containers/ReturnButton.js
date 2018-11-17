// @flow 

export const ReturnButton = connect(()=>{}, {push})(() => 
  <h3 className="beleren link back-link" onClick={()=>this.props.push('/')}>
    Back to decklists
  </h3>
)