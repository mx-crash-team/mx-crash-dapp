import { Address } from '@multiversx/sdk-core/out/address';
import { SmartContract } from '@multiversx/sdk-core/out/smartcontracts/smartContract';
import { AbiRegistry } from '@multiversx/sdk-core/out/smartcontracts/typesystem/abiRegistry';

import { contractAddress } from 'config';
import json from 'contracts/mx-crash-sc.abi.json';

const abi = AbiRegistry.create(json);

export const smartContract = new SmartContract({
  address: new Address(contractAddress),
  abi
});
