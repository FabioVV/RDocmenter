const Markup = [
    { r: /###### (.*?)(\n|$)/g, replace: "<span class='h6'>###### $1</span>" },
    { r: /##### (.*?)(\n|$)/g, replace: "<span class='h5'>##### $1</span>" },
    { r: /#### (.*?)(\n|$)/g, replace: "<span class='h4'>#### $1</span>" },
    { r: /### (.*?)(\n|$)/g, replace: "<span class='h3'>### $1</span>" },
    { r: /## (.*?)(\n|$)/g, replace: "<span class='h2'>## $1</span>" },
    { r: /# (.*?)(\n|$)/g, replace: "<span class='h1'># $1</span>" },
    { r: /\*\*(.*?)\*\*/g, replace: "<strong>**$1**</strong>" },
    { r: /_(.*?)_/g, replace: "<em>_$1_</em>" },
    { r: /`(.*?)`/g, replace: "<code>`$1`</code>" },
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
    Markup.forEach(regex => {
        content = content.replaceAll(regex.r, regex.replace)
    })

    return sanitizeHTML(content)
}


export default parseMarkdown



// function l(t) {
//     let e = t;
//     return (
//         (e = (function (t) {
//             return (t = t.replaceAll(/&/g, "&amp;")), (t = t.replaceAll(/</g, "&lt;")), (t = t.replaceAll(/>/g, "&gt;")), (t = t.replaceAll(/"/g, "&quot;")), (t = t.replaceAll(/'/g, "&#039;")), t;
//         })(e)),
//         (e = (function (t) {
//             return (
//                 (t = (function (t) {
//                     return (t = t.replaceAll(/(?<!\*)\*\*\*([^*]+)\*\*\*(?!\*)/gm, "<strong><em>***$1***</em></strong>")), (t = t.replaceAll(/(?<!_)___([^_]+)___(?!_)/gm, "<strong><em>___$1___</em></strong>")), t;
//                 })(t)),
//                 (t = (function (t) {
//                     return (t = t.replaceAll(/(?<!\*)\*\*([^*]+)\*\*(?!\*)/gm, "<strong>**$1**</strong>")), (t = t.replaceAll(/(?<!_)__([^_]+)__(?!_)/gm, "<strong>__$1__</strong>")), t;
//                 })(t)),
//                 (t = (function (t) {
//                     return (t = t.replaceAll(/(?<!\*)\*([^*]+)\*(?!\*)/gm, "<em>*$1*</em>")), (t = t.replaceAll(/(?<!_)_([^_]+)_(?!_)/gm, "<em>_$1_</em>")), t;
//                 })(t)),
//                 (t = (function (t) {
//                     return t.replaceAll(/~~(.*)?~~/gm, "<s>~~$1~~</s>");
//                 })(t)),
//                 (t = (function (t) {
//                     return t.replaceAll(/==(.*?)==/gm, "<mark>==$1==</mark>");
//                 })(t)),
//                 t
//             );
//         })(e)),
//         (e = (function (t) {
//             return (
//                 (t = (function (t) {
//                     return (
//                         (t = t.replaceAll(/^# (.*)$/gm, '<span class="h1"># $1</span>')),
//                         (t = t.replaceAll(/^## (.*)$/gm, '<span class="h2">## $1</span>')),
//                         (t = t.replaceAll(/^### (.*)$/gm, '<span class="h3">### $1</span>')),
//                         (t = t.replaceAll(/^#### (.*)$/gm, '<span class="h4">#### $1</span>')),
//                         (t = t.replaceAll(/^##### (.*)$/gm, '<span class="h5">##### $1</span>')),
//                         (t = t.replaceAll(/^###### (.*)$/gm, '<span class="h6">###### $1</span>')),
//                         t
//                     );
//                 })(t)),
//                 (t = (function (t) {
//                     return t.replaceAll(/^(\d+\.\s.*)$/gm, '<span class="ol-li">$1</span>');
//                 })(t)),
//                 (t = (function (t) {
//                     return t.replaceAll(/^(-\s.*)$/gm, '<span class="ul-li">$1</span>');
//                 })(t)),
//                 (t = (function (t) {
//                     return t.replaceAll(/^&gt;(.*)$/gm, '<span class="quote">>$1</span>');
//                 })(t)),
//                 t
//             );
//         })(e)),
//         (e = (function (t) {
//             return (function (t) {
//                 return t.replaceAll(/\n---\n/gm, '\n<span class="hr">---</span>\n');
//             })(t);
//         })(e)),
//         (e = (function (t) {
//             return t.replaceAll(/(?<!!)\[(.*?)\]\((.*?)\)/gm, '<span class="link">[$1]($2)</span>');
//         })(e)),
//         (e = (function (t) {
//             return t.replaceAll(/!\[(.*?)\]\((.*?)\)/gm, '<span class="img">$&</span>');
//         })(e)),
//         (e = (function (t) {
//             return (t = t.replaceAll(/^```(.*?)```$/gms, '<span class="code">```$1```</span>')), (t = t.replaceAll(/([^`])`([^`]+)`([^`])/gm, '$1<span class="code">`$2`</span>$3')), t;
//         })(e)),
//         (e = (function (t) {
//             return t.replaceAll(/&lt;!--(.*?)--&gt;/gm, '<span class="comment">&lt;!--$1--&gt;</span>');
//         })(e)),
//         e
//     );