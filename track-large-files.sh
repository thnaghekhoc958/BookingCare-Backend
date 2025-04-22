#!/bin/bash

# Cài đặt Git LFS nếu chưa cài
git lfs install

# Tìm tất cả các tệp có dung lượng lớn hơn 100 MB trong thư mục backend
find . -type f -size +100M | while read file; do
  # Theo dõi các tệp lớn hơn 100 MB bằng Git LFS
  git lfs track "$file"
done

# Thêm tệp .gitattributes vào git để lưu trữ LFS
git add .gitattributes

# Commit các thay đổi
git commit -m "Track large files with Git LFS"

# Push lên remote repository
git push origin main
