class CreateReportJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # delete the file
    infile = File.open("out.txt","r")
    unless infile.nil?
      File.delete(infile)
    end
    # wait for 30 seconds
    sleep(30)
    # create the file again
    outfile = File.new("out.txt","w")
    outfile.puts("new file info")
    outfile.close
  end
end
