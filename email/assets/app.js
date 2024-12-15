(function () {
    const interval = window.setInterval(() => {
        window.clearInterval(interval);
        if ($('button[data-collapse-toggle="navbar-dropdown"]')) {
            $('button[data-collapse-toggle="navbar-dropdown"]').remove();
            $('div[class="hidden w-full md:block md:w-auto"]').remove();
            $("a[href='https://atlaschat.io/']").remove();
            let html = $("a[class='flex items-center space-x-3 rtl:space-x-reverse']").parent().html()
            html += `<a
                href="https://atlaschat.io/"
                class="backbutton"
            >
          Back To AtlasChat
        </a>`;
            $("a[class='flex items-center space-x-3 rtl:space-x-reverse']").parent().html(html)
        }
    }, 10);

})()