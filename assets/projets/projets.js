jQuery(document).ready(function($) {

  var sheetId = "11iwRGQmwYH5m7UmXIKx5iwEXIYSbl9nXs52UsXEwVp4";
  var apiKey = "AIzaSyDHTKK0HTffzWftN-ApDsRfkEC3dFFYb7o";
  var api = "https://content-sheets.googleapis.com/v4/spreadsheets/"+sheetId+"/values/E1:Z100?key="+apiKey;

  $.getJSON(api, function(data) {

    console.log(data);
    var values = data.values;

    var html_content = "";
    var imgId = 0;
    var socials = [
      {
        id: 7,
        name: "envelope"
      },
      {
        id: 8,
        name: "facebook"
      },{
        id: 9,
        name: "twitter"
      },{
        id: 10,
        name: "github"
      },{
        id: 11,
        name: "meetup"
      },{
        id: 12,
        name: "slack"
      }

    ];

    var html_content_top = "";
    var html_website = "";
    var html_socials = "";
    var html_content_bot = "";
    for (var i = 1; i < values.length; i++) {

        html_content_top = "";
        html_website = "";
        html_socials = "";
        html_content_bot = "";
        if( values[i][5] ) {
          imgId = values[i][5].substr(33);
        }

        var imageLink = "https://drive.google.com/uc?export=view&id="+imgId;

          html_content_top +=
          "<div class=\"project_container\">"+
            "<div class=\"project\">"+
              "<div class=\"project_text\" >"+
                "<div class=\"project_title\">"+
                  "<h2>"+values[i][0]+"</h2>"+
                "</div>"+
                "<hr>"+
                "<div class=\"project_description\">"+
                  "<p>"+values[i][1]+"</p>"+
                "</div>"+
              "</div>"+
              "<div class=\"center\">"+
                "<img max-height=\"200\" width=\"100%\" src=\""+imageLink+"\">"+
              "</div>"+
              "<div class=\"website center\">";


              if(values[i][6]) {
                html_website += "<a target=\"_blank\" href=\""+values[i][10]+"\">"+
                    "Site Web"+
                  "</a>";
              }
              html_website += "</div>";

              html_socials += "<div class=\"socialNetworks\">";
              for (var j = 0; j < socials.length; j++) {
                if(values[i][socials[j].id]) {
                  html_socials += "<div class=\""+socials[j].name+"\">"+
                                    "<a target=\"_blank\" href=\""+values[i][socials[j].id]+"\">"+
                                      "<i class=\"fa fa-"+socials[j].name+"\" aria-hidden=\"true\"></i>"+
                                    "</a>"+
                                  "</div>";
                }
              }
              html_socials += "</div>";

          html_content_bot += "</div>"+
                            "</div>";


    html_content += html_content_top + html_website + html_socials + html_content_bot;
    }
    $("#projets_container").html(html_content);

  });

});
