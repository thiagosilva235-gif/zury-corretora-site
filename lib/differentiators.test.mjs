import assert from "node:assert/strict";
import test from "node:test";
import * as content from "./content.ts";

test("institutional presentation separates only the approved claims, preserving source sentences", () => {
  assert.equal(typeof content.differentiatorDetails, "function");
  const original = content.differentiators.map(item => item.description);
  const expected = [
    ["Equipe qualificada", "Atuação autorizada pela SUSEP", "Parceria com diversas seguradoras para proteger seu patrimônio"],
    ["Atendimento humanizado e especializado", "Disponível 24 horas por dia"],
    ["Agilidade nas cotações", "Acompanhamento e resolução de sinistros"],
  ];
  assert.deepEqual(content.differentiators.map(item => content.differentiatorDetails(item.description)), expected);
  assert.deepEqual(content.differentiators.map(item => item.description), original);
});
