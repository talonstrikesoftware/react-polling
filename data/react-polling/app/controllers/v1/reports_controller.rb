class V1::ReportsController < ApplicationController 
    def start 
        puts "starting job"
        CreateReportJob.perform_later
        render json: { status: "starting"}
    end

    def poll
        puts "starting poll"
        result = "Nothing yet"
        if File.exist?("out.txt")
            result = File.mtime("out.txt").to_s
        end
        puts "Rendering result of: #{result}"
        render json: { status: result}
    end    
end    