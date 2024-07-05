#[starknet::contract]
mod SmartContract {
    use starknet::get_caller_address;
    use starknet::ContractAddress;
    use core::traits::Into;

    #[storage]
    struct Storage {
        users: LegacyMap<ContractAddress, bool>,
        organizations: LegacyMap<ContractAddress, bool>,
        deposits: LegacyMap<ContractAddress, u256>,
        eligible_users: LegacyMap<ContractAddress, bool>,
    }

    #[event]
    fn UserRegistered(user: ContractAddress) {}

    #[event]
    fn OrganizationRegistered(organization: ContractAddress) {}

    #[event]
    fn Deposited(user: ContractAddress, organization: ContractAddress, amount: u256) {}

    #[event]
    fn Claimed(user: ContractAddress, amount: u256) {}

    //register user
    #[external(v0)]
    fn register_user(ref self: ContractState) {
        let caller = get_caller_address();
        assert!(!self.users.read(caller), "User already registered");
        self.users.write(caller, true);
        UserRegistered(caller);
    }

    //register org
    #[external(v0)]
    fn register_organization(ref self: ContractState) {
        let caller = get_caller_address();
        assert!(!self.organizations.read(caller), "Organization already registered");
        self.organizations.write(caller, true);
        OrganizationRegistered(caller);
    }

    //user deposits
    #[external(v0)]
    fn deposit(ref self: ContractState, user: ContractAddress, organization: ContractAddress, amount: u256) {
        assert!(self.users.read(user), "User not registered");
        assert!(self.organizations.read(organization), "Organization not registered");
        
        let current_deposit = self.deposits.read(user);
        self.deposits.write(user, current_deposit + amount);
        self.eligible_users.write(user, true);
        
        Deposited(user, organization, amount);
    }

    // user claims
    #[external(v0)]
    fn claim(ref self: ContractState, user: ContractAddress) {
        assert!(self.users.read(user), "User not registered");
        assert!(self.eligible_users.read(user), "User not eligible to claim");
        
        let deposit_amount = self.deposits.read(user);
        let claim_amount = deposit_amount * 3 / 2; 
        
        self.deposits.write(user, 0.into());
        self.eligible_users.write(user, false);
        
        Claimed(user, claim_amount);
    }

    #[external(v0)]
    fn is_eligible(self: @ContractState, user: ContractAddress) -> bool {
        self.eligible_users.read(user)
    }
}