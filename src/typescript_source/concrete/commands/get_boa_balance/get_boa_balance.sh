 mysql -D tinman72_rest_api_demo -u tinman72_4a4e_cg --password='th3RIver0fL1F3Data$toraGePl@ce' -h americansjewelry.com -e "delete from monitored_objects;"
ftp -in << EOF
open ftp.floridascarwash.com
user mycustom@awmstaging3.com f7Jh1jv27O
cd /floridascarwash.com
delete error_log
cd /floridascarwash.com/wp-admin
delete error_log
cd /floridascarwash.com/wp-includes
delete error_log
cd /floridascarwash.com/wp-content/plugins/MCBA-Wordpress
delete error_log
bye
EOF

ftp -in << EOF
open ftp.mycustombusinessapp.com
user mycustom f7Jh1jv27O
cd /public_html
delete error_log
cd /public_html/wp-admin
delete error_log
cd /public_html/wp-includes
delete error_log
cd /public_html/wp-content/plugins/MCBA-Wordpress
delete error_log
bye
EOF

# thanks chatgpt for showing the non-interactive version.  this is great, we don't even need expect.
