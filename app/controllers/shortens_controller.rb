class ShortensController < ApplicationController
	def link
		# render plain: params[:short].inspect
		# 配置
		server_url = 'http://urlis.cn/'
		api_url = 'http://api.urlis.cn/'

		# 参数
		short = server_url + params[:short]

		# 请求
		conn = Faraday.new(:url => api_url) do |faraday|
		  faraday.request  :url_encoded             # form-encode POST params
		  faraday.response :logger                  # log requests to STDOUT
		  faraday.adapter  Faraday.default_adapter  # make requests with Net::HTTP
		end

		# response = conn.get '/nigiri/sake.json'     # GET http://sushi.com/nigiri/sake.json
		# response.body

		# conn.get do |req|                           # GET http://sushi.com/search?page=2&limit=100
		#   req.url '/search', :page => 2
		#   req.params['limit'] = 100
		# end

		response = conn.get 'shortens/v1', { 
			:short => short 
		}

		# 不成功，返回错误
		if response.status != 200
			render plain: JSON.parse(response.body)['error'] and return
		end

		url = JSON.parse(response.body)['url']
		redirect_to url
	end
end
