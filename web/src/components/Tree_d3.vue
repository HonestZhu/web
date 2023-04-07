<template>
  <div id="d3tree" ref="treeContainer"></div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import * as d3 from "d3";

const props = defineProps({
  treeUrl: {
    type: String,
    required: true,
  },
});

const treeContainer = ref(null);

onMounted(() => {
  d3.text(props.treeUrl).then((data) => {
    const rootNode = parseNewick(data);
    const root = d3.hierarchy(rootNode);
    const treeLayout = d3.tree().size([400, 300]);
    treeLayout(root);

    const svg = d3
      .select(treeContainer.value)
      .append("svg")
      .attr("width", 400)
      .attr("height", 300);

    svg
      .selectAll("line")
      .data(root.links())
      .enter()
      .append("line")
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y)
      .attr("stroke", "black");

    svg
      .selectAll("circle")
      .data(root.descendants())
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 5)
      .attr("fill", "white")
      .attr("stroke", "black");

    // 使用$nextTick确保DOM已经更新
    svg.node().addEventListener("DOMNodeInserted", () => {
      treeContainer.value.$nextTick(() => {
        treeContainer.value.querySelector("svg").appendChild(svg.node());
      });
    });
  });
});

// 将nwk格式的字符串解析为json格式
function parseNewick(newick) {
  let ancestors = [];
  let tree = { name: "", children: [] };
  let tokens = newick.split(/\s*(;|\(|\)|,|:)\s*/);
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    switch (token) {
      case "(":
        let subtree = { name: "", children: [] };
        tree.children.push(subtree);
        ancestors.push(tree);
        tree = subtree;
        break;
      case ",":
        let sibling = { name: "", children: [] };
        ancestors[ancestors.length - 1].children.push(sibling);
        tree = sibling;
        break;
      case ")":
        tree = ancestors.pop();
        break;
      case ":":
        break;
      default:
        let x = tokens[i - 1];
        if (x == ")" || x == "(" || x == ",") {
          tree.name = token;
        } else if (x == ":") {
          tree.length = parseFloat(token);
        }
    }
  }
  return tree;
}
</script>