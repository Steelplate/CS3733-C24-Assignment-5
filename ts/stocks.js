// Concrete Subject: RothIRA stock portfolio
var RothIRA = /** @class */ (function () {
    function RothIRA(vfiax, fncmx, vfiaxPrice, fncmxPrice) {
        this.observers = [];
        this.vfiax = vfiax;
        this.fncmx = fncmx;
        this.vfiaxPrice = vfiaxPrice;
        this.fncmxPrice = fncmxPrice;
        document.writeln("Stock Portfolio Starting Total: $".concat(this.getTotal().toFixed(2), "<br>"));
    }
    // Getters
    RothIRA.prototype.getVfiax = function () { return this.vfiax; };
    RothIRA.prototype.getFncmx = function () { return this.fncmx; };
    RothIRA.prototype.getVfiaxPrice = function () { return this.vfiaxPrice; };
    RothIRA.prototype.getFncmxPrice = function () { return this.fncmxPrice; };
    RothIRA.prototype.getTotal = function () { return (this.vfiax * this.vfiaxPrice) + (this.fncmx * this.fncmxPrice); };
    // Setters
    RothIRA.prototype.setVfiax = function (shares) {
        document.writeln("VFIAX shares changed from ".concat(this.vfiax, " to ").concat(shares, "<br>"));
        this.vfiax = shares;
        this.notify();
    };
    RothIRA.prototype.setVfiaxPrice = function (sharePrice) {
        document.writeln("VFIAX Share Price changed from ".concat(this.vfiaxPrice, " to ").concat(sharePrice, "<br>"));
        this.vfiaxPrice = sharePrice;
        this.notify();
    };
    RothIRA.prototype.setFncmx = function (shares) {
        document.writeln("FNCMX shares changed from ".concat(this.fncmx, " to ").concat(shares, "<br>"));
        this.fncmx = shares;
        this.notify();
    };
    RothIRA.prototype.setFncmxPrice = function (sharePrice) {
        document.writeln("FNCMX share price changed from ".concat(this.fncmxPrice, " to ").concat(sharePrice, "<br>"));
        this.fncmxPrice = sharePrice;
        this.notify();
    };
    // Observer pattern methods
    RothIRA.prototype.attach = function (observer) {
        if (this.observers.includes(observer)) {
            document.writeln("Subject: Observer is already attached<br>");
        }
        else {
            this.observers.push(observer);
            document.writeln("Subject: An observer has been attached<br>");
        }
    };
    RothIRA.prototype.detach = function (observer) {
        var observerIndex = this.observers.indexOf(observer);
        if (observerIndex !== -1) {
            this.observers.splice(observerIndex, 1);
            document.writeln("Subject: Observer has been detached<br>");
        }
        else {
            document.writeln("Subject: The observer does not exist<br>");
        }
    };
    RothIRA.prototype.notify = function () {
        document.writeln("Stock Portfolio Change: Notifying observers of a change in state, so they can update themselves<br>");
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(this);
        }
    };
    return RothIRA;
}());
// Concrete Observer: SumObserver
var SumObserver = /** @class */ (function () {
    function SumObserver() {
    }
    SumObserver.prototype.update = function (subject) {
        document.writeln("---------------- Sum Observer ----------------<br>");
        document.writeln("RothIRA Portfolio Total: $".concat(((subject.getVfiax() * subject.getVfiaxPrice()) + (subject.getFncmx() * subject.getFncmxPrice())).toFixed(2), "<br>"));
    };
    return SumObserver;
}());
// Concrete Observer: PercentageObserver
var PercentageObserver = /** @class */ (function () {
    function PercentageObserver() {
    }
    PercentageObserver.prototype.update = function (subject) {
        var total = (subject.getVfiax() * subject.getVfiaxPrice()) + (subject.getFncmx() * subject.getFncmxPrice());
        document.writeln("---------------- Percentage Observer ----------------<br>");
        document.writeln("VFIAX Percentage: ".concat(((subject.getVfiax() * subject.getVfiaxPrice()) / total * 100).toFixed(2), "%<br>"));
        document.writeln("FNCMX Percentage: ".concat(((subject.getFncmx() * subject.getFncmxPrice()) / total * 100).toFixed(2), "%<br>"));
    };
    return PercentageObserver;
}());
// Concrete Observer: DifferenceObserver
var DifferenceObserver = /** @class */ (function () {
    function DifferenceObserver() {
    }
    DifferenceObserver.prototype.update = function (subject) {
        var vfiaxTotal = subject.getVfiax() * subject.getVfiaxPrice();
        var fncmxTotal = subject.getFncmx() * subject.getFncmxPrice();
        document.writeln("---------------- Difference Observer ----------------<br>");
        document.writeln("Shares Difference: ".concat(Math.abs(subject.getVfiax() - subject.getFncmx()).toFixed(2), "<br>"));
        document.writeln("Price Difference: $".concat(Math.abs(subject.getVfiaxPrice() - subject.getFncmxPrice()).toFixed(2), "<br>"));
        document.writeln("Totals Difference: $".concat(Math.abs(vfiaxTotal - fncmxTotal).toFixed(2), "<br>"));
    };
    return DifferenceObserver;
}());
