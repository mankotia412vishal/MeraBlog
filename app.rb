require 'sinatra'
require 'mongo'
require 'dotenv/load'

# Enable sessions
enable :sessions
# Set up MongoDB connection
mongo_client = Mongo::Client.new(ENV['MONGO_URI'])

# Routes

# Home route
get '/' do
  erb :index
end

# Route to render the form for adding a new blog
get '/new_blog' do
  erb :new_blog
end

# Route to handle form submission and save data to MongoDB
post '/new_blog' do
    # Extract data from the form submission
    title = params['title']
    content = params['content']
  
    # Access the MongoDB collection (assuming 'blogs' is the collection name)
    blogs_collection = mongo_client[:blogs]
  
    # Insert the data into MongoDB
    result = blogs_collection.insert_one({ title: title, content: content })
  
    if result.inserted_id
      # Store the inserted blog ID in session
      session[:blog_id] = result.inserted_id
      redirect '/success' # Redirect to the success page
    else
      redirect '/error' # Redirect to an error page if insertion fails
    end
  end
  

# Route to the success page
get '/success' do
  erb :success
end

# Route for the view page
get '/view' do
    # Access the blog ID from session
    blog_id = session[:blog_id]
  
    if blog_id && BSON::ObjectId.legal?(blog_id)
      # Access the MongoDB collection (assuming 'blogs' is the collection name)
      blogs_collection = mongo_client[:blogs]
  
      # Fetch the blog by ID from MongoDB
      @blog = blogs_collection.find({ _id: BSON::ObjectId.from_string(blog_id) }).first
  
      if @blog
        # Print the blog data to the terminal for debugging
        puts "Blog ID: #{@blog['_id']}"
        puts "Title: #{@blog['title']}"
        puts "Content: #{@blog['content']}"
        erb :view
      else
        redirect '/error' # Redirect to an error page if blog not found
      end
    else
      redirect '/error' # Redirect to an error page if invalid blog ID
    end
  end
  
  # Route to view all recent articles
get '/recent_articles' do
  # Access the MongoDB collection (assuming 'blogs' is the collection name)
  blogs_collection = mongo_client[:blogs]

  # Fetch all blogs from MongoDB
  @blogs = blogs_collection.find.to_a

  erb :recent_articles, locals: { blogs: @blogs }
end

# Route to handle updating a blog post
get '/update' do
  # Access the blog ID from the query parameter
  blog_id = params['blog_id']

  if blog_id && BSON::ObjectId.legal?(blog_id)
    # Access the MongoDB collection (assuming 'blogs' is the collection name)
    blogs_collection = mongo_client[:blogs]

    # Fetch the blog by ID from MongoDB
    @blog = blogs_collection.find({ _id: BSON::ObjectId.from_string(blog_id) }).first

    if @blog
      erb :update
    else
      redirect '/error' # Redirect to an error page if blog not found
    end
  else
    redirect '/error' # Redirect to an error page if invalid blog ID
  end
end

# Route to update a specific blog post
post '/update/:blog_id' do
  blog_id = params[:blog_id] # Get the blog ID from the URL params
  new_title = params[:new_title] # Get the new title from the form submission
  new_content = params[:new_content] # Get the new content from the form submission

  # Access the MongoDB collection (assuming 'blogs' is the collection name)
  blogs_collection = mongo_client[:blogs]

  # Update the blog post in MongoDB based on the blog ID
  result = blogs_collection.update_one(
    { _id: BSON::ObjectId.from_string(blog_id) },
    { '$set': { title: new_title, content: new_content } }
  )

  if result.modified_count > 0
    # If the blog post was successfully updated, redirect to a success page or back to the recent articles
    redirect '/success_update' # You can define this route in your application
  else
    # If the blog post was not updated (possibly due to not found), redirect to an error page or handle accordingly
    redirect '/error_update' # You can define this route in your application
  end
end

# Other routes and application logic...

# Example routes for success and error pages
get '/success_update' do
  'Blog post updated successfully!'
end

get '/error_update' do
  'Error updating the blog post. Please try again.'
end

# Route to delete a specific blog post
delete '/delete/:blog_id' do
  blog_id = params[:blog_id] # Get the blog ID from the URL params

  # Access the MongoDB collection (assuming 'blogs' is the collection name)
  blogs_collection = mongo_client[:blogs]

  # Delete the blog post from MongoDB based on the blog ID
  result = blogs_collection.delete_one({ _id: BSON::ObjectId.from_string(blog_id) })

  if result.deleted_count > 0
    # If the blog post was successfully deleted, return a success response
    status 200
    content_type :json
    { message: 'Blog post deleted successfully' }.to_json
  else
    # If the blog post was not deleted (possibly due to not found), return an error response
    status 404
    content_type :json
    { error: 'Blog post not found or could not be deleted' }.to_json
  end
end
# Route for the error page
get '/error' do
  'An error occurred while adding the blog.'
end
