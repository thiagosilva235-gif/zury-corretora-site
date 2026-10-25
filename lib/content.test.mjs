import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { contacts, differentiators, services } from "./content.ts";

const specification = await readFile(new URL("../ZURY-SITE-SPEC.md", import.meta.url), "utf8");

test("all eight service groups match the specification literally, including 44 ordered items", () => {
  assert.equal(services.length, 8);
  assert.equal(services.reduce((sum, service) => sum + service.items.length, 0), 44);
  for (const service of services) {
    const section = specification.split(`#### ${service.number} — ${service.title}\n`)[1]?.split(/\n(?:####|\*\*Contagem)/)[0];
    assert.ok(section, service.title);
    const items = [...section.matchAll(/^- (?!Ícone:)(.+)$/gm)].map((match) => match[1]);
    assert.deepEqual(service.items, items);
  }
});

test("institutional descriptions and individual WhatsApp associations remain official", () => {
  assert.equal(differentiators.length, 3);
  differentiators.forEach((item) => assert.ok(specification.includes(`| ${item.number} | **${item.title}** | \`${item.description}\` |`)));
  assert.equal(contacts.length, 3);
  contacts.forEach((person) => assert.ok(specification.includes(`| ${person.name} | ${person.role} | \`${person.phone}\` | \`${person.href}\` |`)));
});
