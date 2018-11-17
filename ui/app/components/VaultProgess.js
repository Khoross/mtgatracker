// @flow 

export const VaultProgress = (props) => 
  <h3 className="beleren" rv-showvault="lastVaultProgress">
    {`Vault Progress: ${props.vaultProgress}%`}
  </h3>