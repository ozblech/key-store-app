To run Mongodb bitnami with helm:
helm install mongodb bitnami/mongodb \
  --set auth.enabled=false \
  --set persistence.enabled=true \
  --set persistence.size=1Gi