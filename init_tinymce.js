tinyMCE.init({
    language: "ru",
    selector: "textarea#id_content",
    plugins: "spoiler link image lists preview codesample contextmenu table",
    spoiler_windows: true,
    toolbar: "spoiler styleselect bold italic | alignleft aligncenter alignright alignjustify ",
    menubar: 'edit insert format table',
    menu: {
        insert: { title: 'Insert', items: 'spoiler image link media codesample inserttable insertdatetime' },
    },
    /* ... */
})
