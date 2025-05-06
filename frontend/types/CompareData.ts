interface PhysicalAttributes {
    beds: number;
    baths: number;
    sqft: number;
    kitchen: number;
    age: number;
}

interface FinancialAttributes {
    actual_price: string;
    predicted_price: string;
    price_per_sqft: string;
    price_change_in_last_5_years: string;
}

interface MarketAttributes {
    days_on_market: number;
    sales_probability: number;
    total_ownership_transfer: number;
    tax_assessed: string;
}

interface LocationAttributes {
    walk_score: number;
    bike_score: number;
    crime_score: number;
}

// Main Property Data Interface
export interface CompareData {
    image_url: string;
    address: string;
    physical_attributes: PhysicalAttributes;
    financial_attributes: FinancialAttributes;
    market_attributes: MarketAttributes;
    location_attributes: LocationAttributes;
}