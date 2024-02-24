// The Subject interface declares a set of methods for managing subscribers.
interface Subject {
  // Attach an observer to this subject
  attach(observer: Observer): void;

  // Detach an observer from this subject
  detach(observer: Observer): void;

  // Notify all observers about an event, so they can update themselves
  notify(): void;
}

interface Observer {
  update(subject: Subject): void;
}

// Concrete Subject: RothIRA stock portfolio
class RothIRA implements Subject {
  private vfiax: number;
  private fncmx: number;
  private vfiaxPrice: number;
  private fncmxPrice: number;
  private observers: Observer[] = [];

  public constructor(vfiax: number, fncmx: number, vfiaxPrice: number, fncmxPrice: number) {
    this.vfiax = vfiax;
    this.fncmx = fncmx;
    this.vfiaxPrice = vfiaxPrice;
    this.fncmxPrice = fncmxPrice;
    document.writeln(`Stock Portfolio Starting Total: $${this.getTotal().toFixed(2)}<br>`);
  }

  // Getters
  public getVfiax(): number { return this.vfiax; }
  public getFncmx(): number { return this.fncmx; }
  public getVfiaxPrice(): number { return this.vfiaxPrice; }
  public getFncmxPrice(): number { return this.fncmxPrice; }
  private getTotal(): number { return (this.vfiax * this.vfiaxPrice) + (this.fncmx * this.fncmxPrice); }

  // Setters
  public setVfiax(shares: number): void {
    document.writeln(`VFIAX shares changed from ${this.vfiax} to ${shares}<br>`);
    this.vfiax = shares;
    this.notify();
  }
  public setVfiaxPrice(sharePrice: number): void {
    document.writeln(`VFIAX Share Price changed from ${this.vfiaxPrice} to ${sharePrice}<br>`);
    this.vfiaxPrice = sharePrice;
    this.notify();
  }
  public setFncmx(shares: number): void {
    document.writeln(`FNCMX shares changed from ${this.fncmx} to ${shares}<br>`);
    this.fncmx = shares;
    this.notify();
  }
  public setFncmxPrice(sharePrice: number): void {
    document.writeln(`FNCMX share price changed from ${this.fncmxPrice} to ${sharePrice}<br>`);
    this.fncmxPrice = sharePrice;
    this.notify();
  }

  // Observer pattern methods
  public attach(observer: Observer): void {
    if (this.observers.includes(observer)) {
      document.writeln("Subject: Observer is already attached<br>");
    } else {
      this.observers.push(observer);
      document.writeln("Subject: An observer has been attached<br>");
    }
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex !== -1) {
      this.observers.splice(observerIndex, 1);
      document.writeln("Subject: Observer has been detached<br>");
    } else {
      document.writeln("Subject: The observer does not exist<br>");
    }
  }

  public notify(): void {
    document.writeln("Stock Portfolio Change: Notifying observers of a change in state, so they can update themselves<br>");
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}

// Concrete Observer: SumObserver
class SumObserver implements Observer {
  public update(subject: RothIRA): void {
    document.writeln("---------------- Sum Observer ----------------<br>");
    document.writeln(`RothIRA Portfolio Total: $${((subject.getVfiax() * subject.getVfiaxPrice()) + (subject.getFncmx() * subject.getFncmxPrice())).toFixed(2)}<br>`);
  }
}

// Concrete Observer: PercentageObserver
class PercentageObserver implements Observer {
  public update(subject: RothIRA): void {
    const total = (subject.getVfiax() * subject.getVfiaxPrice()) + (subject.getFncmx() * subject.getFncmxPrice());
    document.writeln("---------------- Percentage Observer ----------------<br>");
    document.writeln(`VFIAX Percentage: ${((subject.getVfiax() * subject.getVfiaxPrice()) / total * 100).toFixed(2)}%<br>`);
    document.writeln(`FNCMX Percentage: ${((subject.getFncmx() * subject.getFncmxPrice()) / total * 100).toFixed(2)}%<br>`);
  }
}

// Concrete Observer: DifferenceObserver
class DifferenceObserver implements Observer {
  public update(subject: RothIRA): void {
    const vfiaxTotal = subject.getVfiax() * subject.getVfiaxPrice();
    const fncmxTotal = subject.getFncmx() * subject.getFncmxPrice();
    document.writeln("---------------- Difference Observer ----------------<br>");
    document.writeln(`Shares Difference: ${Math.abs(subject.getVfiax() - subject.getFncmx()).toFixed(2)}<br>`);
    document.writeln(`Price Difference: $${Math.abs(subject.getVfiaxPrice() - subject.getFncmxPrice()).toFixed(2)}<br>`);
    document.writeln(`Totals Difference: $${Math.abs(vfiaxTotal - fncmxTotal).toFixed(2)}<br>`);
  }
}
