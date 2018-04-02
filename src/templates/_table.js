'use strict';

module.exports = (node) => {
  const attrs = node.getAttributes();
  // console.log(node)
  return `<section class="slide slide--table">
<table>
${ node.rows.body.map((cells) => {
   return `<tr>${
     cells.map((c) => {
         return `<td>${c.text}</td>`
     })
     }<tr>`
})}
</table>
</section>`;
};
