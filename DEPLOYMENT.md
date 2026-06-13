# PM TECHNO HUBB — Full-Stack Deployment Plan (Node.js & MongoDB Atlas)

This guide outlines the steps to deploy the **PM TECHNO HUBB** website. The site has been upgraded from a static website to a lightweight **Node.js/Express server** that retrieves gallery projects from a **MongoDB Atlas database** and features gzip compression and custom security headers.

---

## 1. Local Database Seeding (Done Once)

Since MongoDB Atlas is a cloud-hosted database, the data seeded from your local environment is stored in the cloud. The production server will connect to this same database.

1. Ensure your `.env` file contains your connection string:
   ```env
   MONGODB_URI=mongodb+srv://ferrumstudioofficial_db_user:mVkwqH9YggnbE0hI@cluster0.rxhrnd9.mongodb.net/pmtechnohubb?appName=Cluster0
   PORT=3000
   ```
2. Seed the database locally (scans the gallery directory, groups the 60 items into 8 projects, and uploads them to MongoDB):
   ```bash
   npm run seed
   ```

---

## 2. Recommended Hosting Plan: Render (Free Tier)

**Render** is the easiest, most reliable free platform to host Node.js applications.

### Steps to Deploy on Render:
1. Sign in to [Render](https://render.com) using your GitHub account.
2. Click **New +** in the dashboard and select **Web Service**.
3. Connect your GitHub repository: `baryongaming/PMTechnoHub`.
4. Configure the Web Service settings:
   - **Name**: `pm-techno-hubb`
   - **Region**: Select a region close to India (e.g., Singapore `singapore-sg` or `oregon-us`).
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: **Free**
5. Click **Advanced** and add the following **Environment Variables**:
   - `MONGODB_URI` = `mongodb+srv://ferrumstudioofficial_db_user:mVkwqH9YggnbE0hI@cluster0.rxhrnd9.mongodb.net/pmtechnohubb?appName=Cluster0`
   - `NODE_ENV` = `production`
6. Click **Create Web Service**. Render will automatically pull the code, install dependencies, and start the Express server.

---

## 3. Alternative Hosting: Self-Hosted VPS (DigitalOcean / Linode / Hostinger)

For dedicated performance and zero cold starts, a Virtual Private Server (VPS) is recommended.

### Steps to Deploy on VPS (Ubuntu):
1. **Prepare Server**: Connect to your VPS via SSH and install Node.js (v18+), Nginx, and Git:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs nginx git
   ```
2. **Clone Repo & Install**:
   ```bash
   git clone https://github.com/baryongaming/PMTechnoHub.git /var/www/pmtechnohubb
   cd /var/www/pmtechnohubb
   npm install --omit=dev
   ```
3. **Configure Environment**: Create a `.env` file:
   ```bash
   nano .env
   ```
   Add:
   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://ferrumstudioofficial_db_user:mVkwqH9YggnbE0hI@cluster0.rxhrnd9.mongodb.net/pmtechnohubb?appName=Cluster0
   NODE_ENV=production
   ```
4. **Process Management**: Install `pm2` to run the node server continuously in the background:
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name "pmtechnohubb"
   pm2 save
   pm2 startup
   ```
5. **Nginx Reverse Proxy**: Configure Nginx to proxy traffic from port 80/443 to port 3000:
   ```bash
   sudo nano /etc/nginx/sites-available/pmtechnohubb
   ```
   Paste configuration:
   ```nginx
   server {
       listen 80;
       server_name pmtechnohub.com www.pmtechnohub.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   Enable site and restart Nginx:
   ```bash
   sudo ln -s /etc/nginx/sites-available/pmtechnohubb /etc/nginx/sites-enabled/
   sudo systemctl restart nginx
   ```
6. **SSL Setup**: Secure the site using Certbot:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d pmtechnohub.com -d www.pmtechnohub.com
   ```

---

## 4. Custom Domain Configuration

1. Purchase your domain (e.g., `pmtechnohub.com` or `pmtechnohub.in`) from GoDaddy, Hostinger, or Namecheap.
2. In the domain provider's DNS settings, add the following records:
   - **ANAME/ALIAS** (or **A** record if supported): Point `@` to the target Render Web Service URL (e.g., `pm-techno-hubb.onrender.com`) or your VPS IP.
   - **CNAME**: Point `www` to your Render Web Service URL.
3. In Render, go to **Settings** -> **Custom Domains**, click **Add Custom Domain**, and add `pmtechnohub.com` and `www.pmtechnohub.com`. Render will issue SSL certificates automatically.

---

## 5. SEO & AI Search Readiness Maintenance

- **Sitemap**: The `sitemap.xml` is served statically. If you add pages, update the sitemap.
- **Robots.txt**: Restricts or allows specific folders. It references the sitemap URL.
- **AI Crawlers**: The embedded JSON-LD schemas (`LocalBusiness` on home, `ItemList/Product` on products page, `ItemList/Course` on workshops page, `Service` on services page) tell search assistants (ChatGPT Search, Perplexity, Google Gemini) exactly what PM TECHNO HUBB offers. Do not delete the `<script type="application/ld+json">` tags.
