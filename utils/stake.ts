import { Abi } from "starknet";
export const StakeAbi = [
  {
    type: "function",
    name: "register_user",
    inputs: [],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "register_organization",
    inputs: [],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "function",
    name: "deposit",
    inputs: [
      {
        name: "user",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "organization",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "amount",
        type: "core::integer::u256",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "claim",
    inputs: [
      {
        name: "user",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    type: "function",
    name: "is_eligible",
    inputs: [
      {
        name: "user",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::bool",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "event",
    name: "fedchain::smart_contract::SmartContract::Event",
    kind: "enum",
    variants: [],
  },
]satisfies Abi;
