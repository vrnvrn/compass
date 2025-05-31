// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {EmailDomainProver} from "./EmailDomainProver.sol";
import {Proof} from "vlayer-0.1.0/Proof.sol";
import {Verifier} from "vlayer-0.1.0/Verifier.sol";

contract EmailDomainVerifier is Verifier {
    address public prover;

    constructor(address _prover) {
        prover = _prover;
    }

    function verify(Proof calldata , bytes32 , address , string memory )
        public
        view
        onlyVerified(prover, EmailDomainProver.main.selector)
        returns (bool)
    {
        // If we reach this point, it means the proof was valid and the email ownership is verified
        return true;
    }
}
