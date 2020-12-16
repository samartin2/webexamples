    //Variables to use in calculator
    
    var numPeople = 0;
    var zip_code;
	var zipChecker;
    var g_eFactorValue = 0;
	var numVehicles = 1;
    var grandEmissionsTotal = 0;
	var grandReductionTotal = 0;
    var homeEmissionTotal=0;
	var totalAlreadyCorrection = 0;
	var usAvgTotals=[0,0,0,0];           // home, transportation, waste, total
	var userRevisedChartNums=[];
	var progressBarTotals = [0,0,0];           // home, transportation, waste, 
    
    var vehicleData = [[],[],[],[],[]];
    var revisedVehicleData = [[],[],[],[],[]];
    var userTotalEmissions = [0,0,0,0,0,0];            //  Natural Gas, Electricity, Fuel Oil, Propane, Transportation, Waste
    var userRevisedTotalEmissions  = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[],[0,0,0],[0,0,0]];         //  maintenance is always at position [10]
	userRevisedTotalEmissions[23] = [0,0,0];                //  instantiated here in the event the user skips the "% Green Electricity"
    var emissionsSaved = 0;
    var usAvg = [0,0,0,0,0,0];    //  0-3 utilities, 4 transportation, 5 Waste
    var heatSource = "";
	var maintCurrentSelect = "";
    var userRecycling  = [[0,"newspapers"],[0,"glass"],[0,"plastic"],[0,"aluminum and steel cans"],[0,"magazines"]];      // 1 = Already Done, 2 = Will Do, 0 = Won't Do
    var wasteProgress = [0,0,0,0,0];
    var homeProgress = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var vehicleProgress = [,[]];         //  maintenance is always at position [0]
	var totalExhaustAlreadySaved = 0;
	var totalDollarsAlreadySaved = 0;
	var totalExhaustWillSave = 0;
	var totalDollarsWillSave = 0;

    // Household Vehicles
    var g_CO2_EMITTED_PER_GALLON_OF_GASOLINE = 19.6;
    var g_NONCO2_EMITTED_PER_GALLON_OF_GASOLINE = 1.013684744044602;
    var g_AVG_EMISSIONS_PER_VEHICLE = 10484;
    
    // HOME ENERGY
    //  -- NAT GAS
    var g_AVG_NAT_GAS_PRICE_PER_THOUSAND_CUBIC_FEET = 10.68;
    var g_AVG_NAT_GAS_PRICE_PER_THERM = 1.04;
    var g_NAT_GAS_THERMS_EMISSIONS_FACTOR = 11.7;
    var g_NAT_GAS_CUBIC_FEET_EMISSIONS_FACTOR = 119.58;
    var g_NAT_GAS_AVG_EMISSIONS_PER_PERSON = 3071;    
    
    //  -- ELECTRICITY
    var g_AVG_ELEC_PRICE_PER_KILOWATT = 0.1188;
    var g_ELEC_AVG_EMISSIONS_PER_PERSON = 5455;
    var g_ELEC_AVG_COST_PER_PERSON = 43.61;
    
    //  -- FUEL OIL
    var g_AVG_FUEL_OIL_PRICE_PER_GALLON = 4.02;
    var g_FUEL_OIL_EMISSIONS_FACTOR = 22.61;
    var g_FUEL_OIL_AVG_EMISSIONS_PER_PERSON = 4848;    
    
    //  -- Propane
    var g_AVG_PROPANE_PRICE_PER_GALLON = 2.47;
    var g_PROPANE_EMISSIONS_FACTOR = 12.43;
    var g_PROPANE_AVG_EMISSIONS_PER_PERSON = 2243;    
    
    
    // WASTE
    var g_WASTE_AVG_PER_PERSON = 691.5;
    var g_METAL_REDUCTION = -89.38;
    var g_PLASTIC_REDUCTION = -35.56;
    var g_GLASS_REDUCTION = -25.39;
    var g_NEWSPAPER_REDUCTION = -113.14;
    var g_MAGAZINE_REDUCTION = -27.46;
    var g_TOTAL_EMISSIONS_AVG_PER_PERSON = 19702;
    
    
    // ON THE ROAD
    var g_AVG_COST_PER_MILE = 0.1964;
    var g_VEHICLE_EFFICIENCY_IMPROVEMENTS = 0.07;
    var g_AVG_GAS_PRICE_PER_GALLON = 3.68;
    
    // AT HOME
    var g_HEATING_SAVINGS_PER_DEGREE_OF_SETBACK = 0.03;
    var g_PERCENT_NAT_GAS_TO_HEATING = 0.63;
    var g_PERCENT_ELEC_TO_HEATING = 0.09;
    var g_PERCENT_FUEL_OIL_TO_HEATING = 0.87;
    var g_PERCENT_PROPANE_TO_HEATING = 0.70;
    var g_PERCENT_ELEC_TO_COOLING = 0.14;
    var g_COOLING_SAVINGS_PER_DEGREE_OF_SETBACK = 0.06;
    var g_COMPUTER_SLEEP_SAVINGS = 107.1;
    var g_KWH_PER_LOAD_LAUNDRY = 0.96;
    var g_DRYER_SAVINGS = 769;
    var g_LAMP_KWH_SAVINGS = 33;
    var g_LAMP_DOLLAR_SAVINGS = 4;
    var g_FRIDGE_REPLACE_KWH_SAVINGS = 322;
    var g_BOILER_REPLACE_SAVINGS_NAT_GAS = 728;
    var g_BOILER_REPLACE_SAVINGS_FUEL_OIL = 1056;
    var g_BOILER_REPLACE_COST_SAVINGS = 78.34;
    var g_SWITCH_WINDOWS_SAVINGS = 25210000;
    var g_WINDOW_REPLACE_COST_SAVINGS = 150;
    
    
    // CONVERSION FACTORS/CONSTANTS
    var g_BTU_PER_1000CF_NAT_GAS = 1023000;
    var g_BTU_PER_KWH = 3412;
    var g_BTU_PER_GALLON_FUEL_OIL =  138691.09;
    var g_BTU_PER_GALLON_PROPANE =  91335.94;
    var g_NUM_WEEKS_PER_YEAR = 52;
    var g_NUM_MONTHS_PER_YEAR = 12;