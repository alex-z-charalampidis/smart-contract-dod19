pragma solidity ^0.5.9;

contract storeData {
    // Calculated risk index
    uint64 public riskIndex;
    // Sha256 root hash of data stored in offchain database
    bytes32 public db_hash_part1;
    bytes32 public db_hash_part2;
    //Device sha256 root hash
    bytes32 public dev_hash_part1;
    bytes32 public dev_hash_part2;
    //Name of the propertyOwner
    bytes32 public propertyOwner;
    
    //We can also add housing data on top of the rest of the data
    /*Extra:type of construction: Apartment Building / Detached house
     *If constrType == 1 it's Apartment else it's Detached house
    */
    bool constrType;
    /*Extra:type of foundation: cushioning / general type 
     *If foType == 1 it's cushioning type else it's general type 
    */
    bool foType;
    //Extra: Year of construction
    uint16 yearOfConstruction; 
    
    
    function setData(uint64  risk, bytes32  hashP1, bytes32 hashP2, bytes32 dHashP1, bytes32 dHashP2, bytes32 Owner) public {
        riskIndex = risk;
        db_hash_part1 = hashP1;
        db_hash_part2 = hashP2;
		dev_hash_part1 = dHashP1;
		dev_hash_part2 = dHashP2;
		propertyOwner = Owner;
    }

    function setExtra (bool consType, bool fType, uint16 yOfConst) public {
		constrType = consType;
		foType = fType;
        yearOfConstruction = yOfConst;
    }
	
    function validateHashes(bytes32 db_h1,bytes32 db_h2,bytes32 dev_h1,bytes32 dev_h2) public returns (bool){
	if ((db_h1 == dev_h1) && (db_h2 == dev_h2)) {
	    return true;
	}
	else {
	    return false;
	}
	}
	
	function retrieveData (int data) public returns (bytes32){
	    if (data == 1) {
	        return db_hash_part1;
	    }
	    else if (data == 2){
	        return db_hash_part2;
	    }
	    else if (data == 3){
	        return dev_hash_part1;
	    }
	    else if (data == 4){
	        return dev_hash_part2;
	    }
	    else {
	        return 0;
	    }
	}
}
