To run Mongodb bitnami with helm:
helm install mongodb bitnami/mongodb \
  --set auth.enabled=false \
  --set persistence.enabled=true \
  --set persistence.size=1Gi

  To get minikube service url:
  minikube service kv-store-chart --url

  To run test script:
  python test_api.py <<<url>>>