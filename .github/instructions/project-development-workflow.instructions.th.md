---
name: Project Development Workflow (ภาษาไทย)
description: "ใช้เมื่อวางแผนหรือส่งมอบโครงการผ่าน Workflow ของ BA, SA, Senior Developer และ Tester ครอบคลุม Requirements, System Analysis, โครงสร้างโปรเจกต์, Task Breakdown, Implementation, Unit Tests, Security และ Validation"
---
# Project Development Workflow

## Color Tokens ของโครงการ
- ใช้สีของโครงการทั้งสามสีนี้เท่านั้น เว้นแต่ผู้ใช้จะอนุมัติข้อยกเว้นอย่างชัดเจน:
        - Background: `#FFFFFF` (สีขาว)
        - Text: `#000000` (สีดำ)
        - SCB Purple: `#4E2A84`
- ใช้ `#FFFFFF` เป็นพื้นหลังเริ่มต้นของหน้าเว็บหรือสไลด์ และใช้ `#000000` เป็นสีข้อความหลักที่อ่านได้ชัดเจน
- ใช้ `#4E2A84` สำหรับ Brand Accent, Primary Action, Highlight, Link และการเน้นส่วนอื่น ๆ
- ห้ามเพิ่มสีอื่นสำหรับ Visual Design ของโครงการโดยไม่บันทึกเป็น Decision อย่างชัดเจน

ให้ใช้ Workflow นี้สำหรับงานโครงการ เว้นแต่ผู้ใช้จะร้องขอ Scope หรือ Stage อื่นอย่างชัดเจน:

```text
BA
        |
        v
SA
        |
        v
Senior Developer
        |
        v
Tester
```

## กฎของ Workflow
- ปฏิบัติต่อแต่ละ Stage เป็น Handoff ที่มี Input, Output, Assumption, Decision และ Open Question อย่างชัดเจน
- ห้ามข้าม Stage โดยไม่แจ้ง เมื่อ Output ของ Stage นั้นจำเป็นต่อ Stage ถัดไป
- Stage ภายหลังสามารถพบ Gap ของ Stage ก่อนหน้าได้ แต่ต้องบันทึก Gap และขอคำชี้แจง หรือสร้าง Assumption ที่ระบุไว้อย่างชัดเจนก่อนดำเนินการต่อ
- แยก Confirmed Facts, Proposals, Assumptions และ Unresolved Decisions ให้เห็นได้อย่างชัดเจน
- ใช้ภาษาของผู้ใช้สำหรับ Report และการสื่อสาร โดยคง Technical Terms ภาษาอังกฤษที่แม่นยำไว้เมื่อมีประโยชน์
- ทำให้ Requirements, Architecture, Project Structure, Tasks, Implementation และ Test Evidence สามารถตรวจสอบย้อนกลับถึงกันได้

## Stage 1: BA
BA รวบรวมและชี้แจงปัญหาก่อนเริ่ม Technical Design

ความรับผิดชอบ:
- สัมภาษณ์ Stakeholder เป็นรอบแบบเจาะจง โดยแต่ละรอบมีคำถามสำคัญไม่เกินห้าข้อ
- ระบุ Goals, Users, Business Rules, Scope, Constraints, Success Criteria, Risks, Dependencies และ Open Decisions
- แยก Confirmed Requirements ออกจาก Assumptions, Recommendations, Conflicts และ Unknowns
- กำหนด Acceptance Criteria ที่ทดสอบได้ โดยไม่สร้างพฤติกรรมที่ไม่มีข้อมูลรองรับ

Output ที่จำเป็น:
- Project Requirements Summary
- `context.md` ที่มี Requirements Handoff แบบมีโครงสร้างครบถ้วน
- Stakeholders และ Users
- ขอบเขต In-scope และ Out-of-scope
- Functional และ Non-functional Requirements พร้อม ID, Priority, Source และ Status
- Acceptance Criteria
- Risks, Assumptions, Dependencies และ Open Questions

ข้อจำกัด:
- ห้ามเขียน Application Code หรือทำ Implementation Changes

## Stage 2: System Analyst
System Analyst แปลง Requirements ให้เป็นข้อเสนอ System Design

ความรับผิดชอบ:
- วิเคราะห์ Actors, Use Cases, Business Rules, System Boundaries, Modules, Services, Data Flows, Integrations และ Non-functional Requirements
- เปรียบเทียบ Architecture Options ที่เหมาะสมและอธิบาย Trade-offs
- แนะนำ Tech Stack โดยพิจารณาจาก Requirements, Scale, Team Capability, Cost, Risk และ Operations
- ออกแบบ Logical Data Models, Ownership, Relationships, API Boundaries, Security Boundaries และ Operational Concerns
- Review Design Patterns และ SOLID Principles ตามบริบท
- จัดทำ High-Level Architecture, Data Flow, Sequence และ ER Diagrams โดยใช้ชื่อที่สอดคล้องกัน

Output ที่จำเป็น:
- System Analysis Report
- `architecture.md` ที่มี Architecture Handoff ครบถ้วนสำหรับ Senior Developer
- Architecture ที่แนะนำและทางเลือกที่ไม่เลือก พร้อมเหตุผล
- Proposed Modules/Components และ Dependency Direction
- Logical Data Model และ ER Diagram
- Tech Stack Recommendation พร้อม Trade-offs
- Security, Observability, Scalability และ Operational Considerations
- Risks, Assumptions, Decisions ที่ต้องตัดสินใจ และ Open Questions

ข้อจำกัด:
- ห้ามเขียน Application Code, Database Migrations หรือ Production Configuration
- ห้ามทำเครื่องหมายว่า System Analysis พร้อม Handoff จนกว่า `architecture.md` จะมีอยู่และสอดคล้องกับ Report และ Diagrams

## Stage 3: Senior Developer - Technical Preparation
Senior Developer แปลง System Analysis ให้เป็น Preparation Plan ที่พร้อมสำหรับ Implementation ก่อนเขียน Business Logic

ความรับผิดชอบ:
- อ่าน `architecture.md` ในฐานะ Primary Handoff จาก System Analyst และรายงาน Architectural Decisions ที่ขาดหายหรือขัดแย้งกันก่อนวางแผน
- รวม Tech Stack Decisions และบันทึก Alternatives, Constraints, Risks และ Decision Status
- เตรียม Project Directory และ Module Structure ที่เสนอ
- เตรียม Logical Database Structure, Ownership, Relationships, Constraints, Indexes, Lifecycle, Audit, Privacy, Backup และ Migration Considerations
- กำหนด Technical Conventions สำหรับ Modules, Dependencies, APIs, Configuration, Testing, Security, Logging, Observability และ Documentation
- แบ่งงานเป็น Phases, Epics, Tasks และ Subtasks โดยเรียงตาม Dependency และการลดความเสี่ยง
- ทุก Task ต้องมี Objective, Deliverable, Dependencies, Priority, Owner/Reviewer และ Acceptance Criteria

กฎของ Project Skeleton:
- Senior Developer สร้าง Initial Project Skeleton ตาม Tech Stack ที่เลือกก่อนเริ่ม Implementation
- Skeleton Work อาจประกอบด้วย Directories, Package Manifests, Compiler/Linter Configuration, Environment Templates ที่ไม่มี Secrets, Test/Documentation Directories และ Structural Configuration
- Skeleton Work ต้องไม่มี Business Logic, API Behavior, UI Behavior, Database Migrations, Seed Data หรือ Production Infrastructure Implementation
- ระบุ Generated Files ให้ชัดเจนว่าเป็น Skeleton หรือ Placeholder
- หลังสร้าง Skeleton ให้อัปเดต `README.md` ด้วย Tech Stack, Structure, Prerequisites, Status, Limitations และ Links ไปยัง Planning Documents ปัจจุบัน
- บันทึก Task Breakdown ทั้งหมดใน `Task.md`

Output ที่จำเป็น:
- Technical Preparation Plan
- Tech Stack Decision Record
- Proposed Project Structure
- Database Preparation และ ER Diagram
- Technical Standards และ Conventions
- Phased Delivery Plan
- Work Breakdown ที่มี Task IDs และตรวจสอบย้อนกลับได้
- `README.md` ที่อัปเดตหลังสร้าง Project Skeleton
- Task Breakdown ที่บันทึกถาวรใน `Task.md`
- Risks, Blockers, Open Decisions และ Implementation Readiness Verdict

## Stage 3.1: Senior Developer - Implementation
Senior Developer Implement เฉพาะ Approved Tasks หลังจาก Preparation Gate ผ่านแล้วเท่านั้น

ความรับผิดชอบ:
- อ่าน Task ID, Acceptance Criteria, Architecture, Technical Preparation Plan, Existing Code, Conventions และ Nearby Tests ก่อนแก้ไข
- Implement เฉพาะ Approved Task Scope
- ปฏิบัติตาม Selected Architecture, Design Patterns, SOLID Principles, Module Boundaries และ Dependency Direction
- เขียนหรืออัปเดต Unit Tests สำหรับทุก Behavior ที่เปลี่ยน รวม Success, Validation, Boundary และ Failure Cases ที่เกี่ยวข้อง
- ทุก Development Task ต้องเพิ่มหรืออัปเดต Unit Test ที่เกี่ยวข้องอย่างน้อยหนึ่งรายการ ห้ามทำเครื่องหมายว่า Implementation Task เสร็จ หากไม่มี Executable Unit Test Coverage และผล Focused Test ที่ผ่าน
- ใช้ Secure Coding Practices สำหรับ Input, Authorization, Secrets, Injection, Data Handling, Error Messages และ Dependencies
- รัน Focused Unit Tests ทันทีหลัง Implementation จากนั้นรัน Broader Checks เมื่อการเปลี่ยนแปลงจำเป็นต้องตรวจสอบ
- วินิจฉัย Failure ด้วย Evidence และรายงาน Validation ที่ Blocked หรือ Failed อย่างตรงไปตรงมา

Preparation Gate:
- ห้ามเริ่ม Business Logic Implementation จนกว่า Project Structure และ Module Boundaries จะถูกบันทึกไว้
- ยืนยันว่า `README.md` อธิบาย Current Structure และ Selected Tech Stack
- ยืนยันว่า `Task.md` มี Stable Task IDs, Dependencies, Owners และ Acceptance Criteria
- ยืนยันว่า Database Preparation, API/Integration Contracts, Testing Strategy, Security Conventions และ Observability Conventions ถูกบันทึกไว้เมื่อเกี่ยวข้อง
- บันทึก Unresolved Decisions และ Blockers อย่างชัดเจน ห้ามสร้าง Requirements ขึ้นเองโดยไม่แจ้ง
- หากไม่สามารถสร้างหรือรัน Unit Test ที่จำเป็นได้ ให้ทำเครื่องหมาย Development Task เป็น `Blocked` พร้อมระบุ Blocker ที่แน่นอน ห้ามทำเครื่องหมายว่าเสร็จ

Output ที่จำเป็น:
- Implemented Code สำหรับ Approved Task
- Unit Tests
- Test และ Validation Results
- Design Pattern และ SOLID Review
- Security Review
- Remaining Risks, Limitations หรือ Follow-up Tasks

ข้อจำกัด:
- ห้ามขยาย Scope ด้วย Unrelated Refactors หรือ Speculative Features

## Stage 4: Tester
Tester ตรวจสอบระบบที่ Implement แล้วโดยไม่เปลี่ยนแปลง Production Behavior

ความรับผิดชอบ:
- แมป Requirements และ Acceptance Criteria เข้ากับ Risk-based Test Scenarios
- รัน Unit, Integration, API/Contract, End-to-End, Regression, Performance, Accessibility และ Security Tests ที่เหมาะสม
- สร้างหรืออัปเดต Test Files, Fixtures, Test Data และ Test Configuration เมื่อจำเป็น
- ตรวจสอบ Failure และจัดประเภทเป็น Product Defect, Test Defect, Environment Issue, Flaky Test หรือ Pre-existing Failure
- ตรวจสอบ Authorization, Input Validation, Data Integrity, Tenant Isolation, Error Handling, Rate Limits, Idempotency และ Critical Workflows เมื่อเกี่ยวข้อง
- รายงาน Evidence, Defects, Blocked Tests, Coverage Gaps, Residual Risks และ Release Recommendation

ข้อจำกัด:
- ห้ามแก้ไข Application Production Code, Business Logic, API Behavior, UI Behavior, Database Schema หรือ Infrastructure เพื่อทำให้ Test ผ่าน

กฎ Security Audit:
- ใช้ Focused Security Checks สำหรับการทดสอบทั่วไป
- เมื่อผู้ใช้ร้องขอ Full Security Audit, Pen Test, Comprehensive Review หรือ Audit Artifacts อย่างชัดเจน ให้ใช้ Complete Workflow ของ Skill `security-audit`
- ปฏิบัติตามข้อกำหนดด้าน Sandbox, Source-first Evidence, Write Isolation, Coverage, Candidate Validation และ Reporting ของ Skill นั้น
- ห้าม Probe Production, Deployed Endpoints, Shared Infrastructure, Live Identities หรือข้อมูลของผู้ใช้อื่น
- หากไม่สามารถบังคับใช้ Sandbox Controls ที่จำเป็นได้ ห้ามรัน Target-controlled Code และให้รายงาน Validation Blocker ที่แน่นอน

Output ที่จำเป็น:
- Test Report
- Test Matrix และ Execution Results
- Defect List ที่มี Reproducible Evidence และ Severity
- Security และ Quality Check Results
- Coverage Gaps และ Blocked Tests
- Go, Go with Conditions หรือ No-Go Release Recommendation

## Handoff Gate
ก่อนเลื่อนไปยัง Stage ถัดไป ให้ตรวจสอบว่า:
- Required Output ของ Stage ปัจจุบันมีอยู่ หรือมีการบันทึกรายการที่ขาดหายไว้อย่างชัดเจน
- Stage ถัดไปมีข้อมูลเพียงพอที่จะดำเนินการต่อโดยไม่ต้องสร้าง Requirements ขึ้นเอง
- Assumptions และ Open Decisions ทั้งหมดมี Owner หรือ Validation Plan
- ชื่อของ Requirements, Modules, Entities, Tasks และ Test Cases ยังคงสอดคล้องกัน
- ไม่มี Stage ใดอ้างว่าเสร็จสมบูรณ์จาก Planned Work เพียงอย่างเดียว โดย Implementation และ Testing ต้องมี Executable Evidence
