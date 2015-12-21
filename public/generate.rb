require 'htmlbeautifier'

pages = ["index", "add_product"]

pages.each do |page|
	result = `curl -s http://localhost:5000?p=#{page}`
	# result = result.gsub(/[\t ]+/, " ")
	beautiful = HtmlBeautifier.beautify(result)
	File.write("./#{page}.html", beautiful)
end