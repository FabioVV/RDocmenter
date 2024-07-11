const Markup = [
    { r: /^###### (.*)$/gm, replace: "<span class='h6'>###### $1</span>" },
    { r: /^##### (.*)$/gm, replace: "<span class='h5'>##### $1</span>" },
    { r: /^#### (.*)$/gm, replace: "<span class='h4'>#### $1</span>" },
    { r: /^### (.*)$/gm, replace: "<span class='h3'>### $1</span>" },
    { r: /^## (.*)$/gm, replace: "<span class='h2'>## $1</span>" },
    { r: /^# (.*)$/gm, replace: "<h1 class='h1'># $1</h1>" },
    { r: /(?<!\*)\*\*([^*]+)\*\*(?!\*)/gm, replace: "<strong>**$1**</strong>" },
    { r: /(?<!_)__([^_]+)__(?!_)/gm, replace: "<strong>__$1__</strong>" },
    { r: /(?<!\*)\*\*\*([^*]+)\*\*\*(?!\*)/gm, replace: "<strong><em>***$1***</em></strong>" },
    { r: /(?<!\*)\*([^*]+)\*(?!\*)/gm, replace: "<em>*$1*</em>" },
    { r: /(?<!_)_([^_]+)_(?!_)/gm, replace: "<em>_$1_</em>" },
    { r: /`(.*?)`/g, replace: "<code>`$1`</code>" },
    // { r: /^```(.*?)```$/gms, replace: "<code>```$1```</code>" },
    { r: /==(.*?)==/gm, replace: "<mark>`$1`</mark>" },
    { r: /~~(.*)?~~/gm, replace: "<s>~~$1~~</s>" },
    { r: /&lt;!--(.*?)--&gt;/gm, replace: "<span class='comment'>&lt;!--$1--&gt;</span>" },
    { r: /\n---\n/gm, replace: "\n<span class='hr'>---</span>\n" },

]


function sanitizeHTML(c) {
    c = c.replaceAll(/&/g, "&amp;");
    c = c.replaceAll(/</g, "&lt;");
    c = c.replaceAll(/>/g, "&gt;");
    c = c.replaceAll(/"/g, "&quot;");
    c = c.replaceAll(/'/g, "&#039;");
    return c;
}

function parseMarkdown(content = ""){
    content = sanitizeHTML(content)

    Markup.forEach(regex => {
        content = content.replaceAll(regex.r, regex.replace)
    })
    return content
}


export default parseMarkdown
