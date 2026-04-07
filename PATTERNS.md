# Design Patterns — Learning Projects

> One project per pattern. Each project is a small, focused app that makes the pattern tangible.

---

## Behavioral

| Pattern                 | Intent                                                                 | Project                                          |
|-------------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Chain of Responsibility | Pass a request along a chain of handlers until one handles it         | —                                                |
| **Command**             | Encapsulate a request as an object; decouple sender from receiver     | [rocket-cli](../rocket-cli)                      |
| Iterator                | Traverse elements of a collection without exposing its structure      | —                                                |
| Mediator                | Reduce direct dependencies between objects via a central coordinator  | —                                                |
| **Memento**             | Capture and restore an object's state (undo/redo)                     | [memento-notepad](../memento-notepad)            |
| Observer                | Notify dependents automatically when an object changes state          | —                                                |
| State                   | Change object behavior when its internal state changes                | —                                                |
| Strategy                | Define a family of algorithms and make them interchangeable           | —                                                |
| Template Method         | Skeleton of an algorithm in a base class; subclasses fill in steps    | —                                                |
| Visitor                 | Add operations to objects without modifying their classes             | —                                                |

---

## Creational

| Pattern          | Intent                                                                 | Project |
|------------------|------------------------------------------------------------------------|---------|
| Abstract Factory | Create families of related objects without specifying concrete classes | —       |
| Builder          | Construct complex objects step by step                                 | —       |
| Factory Method   | Let subclasses decide which class to instantiate                       | —       |
| Prototype        | Clone existing objects instead of creating from scratch                | —       |
| Singleton        | Ensure a class has only one instance                                   | —       |

---

## Structural

| Pattern   | Intent                                                                    | Project |
|-----------|---------------------------------------------------------------------------|---------|
| Adapter   | Make incompatible interfaces work together                                | —       |
| Bridge    | Decouple abstraction from implementation so both can vary independently   | —       |
| Composite | Compose objects into tree structures to represent part-whole hierarchies  | —       |
| Decorator | Attach new behaviors to objects by wrapping them                          | —       |
| Facade    | Provide a simplified interface to a complex subsystem                     | —       |
| Flyweight | Share common state among many fine-grained objects to save memory         | —       |
| Proxy     | Provide a surrogate that controls access to another object                | —       |
