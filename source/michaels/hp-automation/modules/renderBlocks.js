/* ---- renderBlocks ----
 *
 * Generates and concatenates markup for an array of blocks using the template
 * provided.
 *
 * Throws an error if the template or block data is not found.
 *
 * Inputs:
 *   - template (function): Template from which to generate markup
 *   - blocks (array of objects): Source data for the blocks
 *   - ...args (optional): Additional arguments to pass to the template
 *
 * Output (string): Concatenated markup for all blocks
 */
function renderBlocks(template, blocks, ...args) {
    if (!template) throw new Error('Block template not found.');
    if (!blocks || !blocks.length) throw new Error('Block data not found.');

    // Call the template function for each block, then join the output. Convert
    // the index from 0-based to 1-based before passing to the template
    return blocks.map((block, i) => template(block, i + 1, ...args)).join('');
}

module.exports = renderBlocks;
