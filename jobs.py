from urllib.request import urlopen  as uReq
from urllib.request import urlretrieve
from bs4  import BeautifulSoup as Soup
from PIL import Image
from resizeimage import resizeimage
from pymongo import MongoClient
client = MongoClient('mongodb+srv://asmakhan:asmakhan@rizkpk-2pdyk.mongodb.net/test')
db=client.test

try:
    my_url = 'https://www.ilmkidunya.com/jobs/category-wise-jobs.aspx'
    #opening up connection,grabbing the category page
    uClient = uReq(my_url)
    page_html = uClient.read()
    uClient.close()
    #grabs each product 
    cat_html = Soup(page_html, "html.parser")
          
    #grabbing all categories
    categories  = cat_html.find("div", {"class":"jobByCategories"})
    lis = categories.findAll("li")
       
    # loop on categories  
    for li in lis:
    
        cat_href = li.a['href']
        category = li.a.div.p.text
        cat_id = category.replace(' ', '-').lower()
        categories = db.categories.update_one({"_id":cat_id}, {"$set": {"title":category}}, upsert=True)
        
        cat_url = 'https://www.ilmkidunya.com'+cat_href
        # there is error on this category so I'm excluding this category
        if cat_url != 'https://www.ilmkidunya.com/jobs/jobs-categories/advertising-media-showbiz.aspx':
            #opening up connection,grabbing jobs by category
            uClient = uReq(cat_url)
            job_html = uClient.read()
            uClient.close()
        
        #grabs jobs 
        jobs_html = Soup(job_html, "html.parser")
    
    
        #grabbing required div
        elements  = jobs_html.findAll("div", {"class":"link-inner"})
        
        for element in elements:
        
            jobtitle = element.find("div", {"class": "desc"}).a.div.text
            city = element.div.a.span.text
            city_id = city.lower()
            desc = element.find("div", {"class": "desc"}).a['href']
            desc_url = 'https://www.ilmkidunya.com'+desc
            
            #opening up connection,grabbing description of each job
            uClient = uReq(desc_url)
            desc_html = uClient.read()
            uClient.close()
            
            description_html = Soup(desc_html, "html.parser")
            desc_ele  = description_html.find("div", {"class":"load-more-content"})
            description = desc_ele.text
            x = description.index("Feel free to ask any")
            newd = description[:x].strip()
            
            img_ele  = description_html.find("div", {"id":"image-gallery-1"})
            img_url = img_ele.a['href']
            filename = img_url.split('/')[-1]
            #print('img_ele',img_url)
            
            # add new cities 
            cities = db.cities.update_one({"_id":city_id}, {"$set": {"name":city}}, upsert=True)
            #print(cities)
            
            # add job 
            citydata = [{
            "_id" : city_id,
            "name" : city,
            }]
            catdata = [{
            "_id" : cat_id,
            "title" : category,
            }]
            job = {
                'title' : jobtitle,
                'city' : citydata,
                'category' : catdata,
                'job_description' : newd,
                'image' : filename
            }
            jobs=db.jobs.insert_one(job)
            print(jobs)
    
            urlretrieve(img_url, 'admin/public/uploads/orignal/'+filename)
            
            with open('admin/public/uploads/orignal/'+filename, 'r+b') as f:
                with Image.open(f) as image:
                    cover = resizeimage.resize_cover(image, [200, 100])
                    cover.save('admin/public/uploads/thumbs/'+filename, image.format)
                
except:
  print("Something went wrong")               
           
    	
                
        
            	
        


