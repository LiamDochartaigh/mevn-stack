function CurrencyToSymbolMap(currency) {
    switch (currency) {
        case "usd":
            return "$";
        case "eur":
            return "€";
        case "gbp":
            return "£";
    }
}

module.exports = {
    CurrencyToSymbolMap
}