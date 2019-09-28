pragma solidity ^0.5.9;

contract storeData {
    // Calculated weightedAverage of physical exposure risk 
    uint64 weightedAverage;
    // Sha256 hash of data stored in offchain database must be split into 2 parts 
    bytes32 hash_part1;
    bytes32 hash_part2;
    //Device sha256 hash
    bytes32 dev_hash_part1;
    bytes32 dev_hash_part2;
    //Property owner
    bytes32 propertyOwner;
    
    //We can also add housing data on top of the rest of the data
    //Extra:type of construction: Apartment Building / Detached house
    bool constrType;
    //Extra:type of foundation: cushioning / general type 
    bool foType;
    //Extra: Year of construction
    uint16 yearOfConstruction; 

    function setData(uint64 wAver, bytes32 hashP1, bytes32 hashP2, bytes32 dHashP1, bytes32 dHashP2, bytes32 Owner) public {
        weightedAverage = wAver;
        hash_part1 = hashP1;
        hash_part2 = hashP2;
		dev_hash_part1 = dHashP1;
		dev_hash_part2 = dHashP2;
		propertyOwner = Owner;
    }

    function setExtra (bool consType, bool fType, uint16 yOfConst) public {
		constrType = consType;
		foType = fType;
        yearOfConstruction = yOfConst;
    }
}
