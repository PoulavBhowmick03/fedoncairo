use starknet::ContractAddress;
use fedchain::SmartContract;

fn main() {
    let contract = SmartContract::contract_state_for_testing();
    
    let user_address: ContractAddress = 0x123.try_into().unwrap();
    contract.register_user();
    
    let is_eligible = contract.is_eligible(user_address);
    println!("Is user eligible before deposit: {}", is_eligible);
    
    let org_address: ContractAddress = 0x456.try_into().unwrap();
    contract.deposit(user_address, org_address, 1000_u256);
    
    let is_eligible = contract.is_eligible(user_address);
    println!("Is user eligible after deposit: {}", is_eligible);
}