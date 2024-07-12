const Markup = [
    { r: /^###### (.*)$/gm, replace: "<h6 class='h6'>###### $1</h6>" },
    { r: /^##### (.*)$/gm, replace: "<h5 class='h5'>##### $1</h5>" },
    { r: /^#### (.*)$/gm, replace: "<h4 class='h4'>#### $1</h4>" },
    { r: /^### (.*)$/gm, replace: "<h3 class='h3'>### $1</h3>" },
    { r: /^## (.*)$/gm, replace: "<h2 class='h2'>## $1</h2>" },
    { r: /^# (.*)$/gm, replace: "<h1 class='h1'># $1</h1>" },
    { r: /(?<!\*)\*\*([^*]+)\*\*(?!\*)/gm, replace: "<strong>**$1**</strong>" },
    { r: /(?<!_)__([^_]+)__(?!_)/gm, replace: "<strong>__$1__</strong>" },
    { r: /(?<!\*)\*\*\*([^*]+)\*\*\*(?!\*)/gm, replace: "<strong><em>***$1***</em></strong>" },
    { r: /(?<!\*)\*([^*]+)\*(?!\*)/gm, replace: "<em>*$1*</em>" },
    { r: /(?<!_)_([^_]+)_(?!_)/gm, replace: "<em>_$1_</em>" },
    { r: /^```(.*?)```$/gms, replace: "<code>```$1```</code>" },
    { r: /([^`])`([^`]+)`([^`])/gm, replace: "$1<code>`$2`</code>$3" },
    { r: /==(.*?)==/gm, replace: "<mark>==$1==</mark>" },
    { r: /~~(.*)?~~/gm, replace: "<s>~~$1~~</s>" },
    { r: /(?<!!)\[(.*?)\]\((.*?)\)/gm, replace: "[$1]<a href='$2'>($2)</a>" },
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
    // content = sanitizeHTML(content)

    Markup.forEach(regex => {
        content = content.replaceAll(regex.r, regex.replace)
    })
    return content
}


export default parseMarkdown
